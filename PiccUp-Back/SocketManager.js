const io = require('./server').io;
const db = require('./server').db;

var User = require('./models/User');
var Message = require('./models/Message');
var Chat = require('./models/Chat');
var Game = require('./models/Game');

const {
    USER_CONNECTED,
    USER_DISCONNECTED,
    LOGOUT,
    GENERAL_CHAT,
    MESSAGE_RECEIVED,
    MESSAGE_SENT,
    TYPING,
    PRIVATE_MESSAGE,
    CREATE_GAME,
    DELETE_GAME,
    GET_GAMES,
    JOIN_TEAM,
    JOIN_GAME,
    GET_CHATS,
    LOAD_MESSAGES,
    REMOVE_PLAYER,
    GET_PROFILE,
    GET_HISTORY
} = require('./Events');

const { createChat } = require('./Factories');

let connectedUsers = {};

let generalChat = createChat();

module.exports = function(socket) {
    console.log('\x1bc'); //clears console

    /******************
    // CONECT EVENTS //
    ******************/
    console.log('Socket Id:' + socket.id);

    // User Connects with username
    socket.on(USER_CONNECTED, async user => {
        console.log('ACTION: ON USER_CONNECTED');

        connectedUsers = addUser(connectedUsers, user);
        console.log('User connected: ' + user.username);

        user.socketId = socket.id;
        socket.user = user.username;

        // client initialization
        socket.emit(GENERAL_CHAT, generalChat);
        const activeGames = await getActiveGames();
        socket.emit(GET_GAMES, activeGames);
        const existingChats = await Chat.find({ users: user.username })
            .lean()
            .exec();
        socket.emit(GET_CHATS, existingChats);
        socket.emit(GET_HISTORY, await getPlayerHistory(user.username));
        // signal online
        const usersOnline = Object.keys(connectedUsers);
        io.emit(USER_CONNECTED, usersOnline); // client side does nothing atm
        console.log(connectedUsers);
    });

    //User logout
    socket.on(LOGOUT, () => {
        connectedUsers = removeUser(connectedUsers, socket.user);
        // io.emit(USER_DISCONNECTED, connectedUsers); // client side does nothing atm
        console.log('User logged out: ' + socket.user);
    });

    //User disconnects
    socket.on('disconnect', () => {
        if ('user' in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user);
            const usersOnline = Object.keys(connectedUsers);
            io.emit(USER_CONNECTED, usersOnline);
            console.log('User disconnected: ' + socket.user);
            console.log(connectedUsers);
        }
    });

    /*******************
    // Profile EVENTS //
    *******************/
    socket.on(GET_HISTORY, async username => {
        return socket.emit(GET_HISTORY, await getPlayerHistory(username));
    });
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    socket.on(GET_PROFILE, async username => {
        console.log('ACTION: ON GET_PROFILE');

        const profile = {
            profile: await getPlayerProfile(username),
            history: await getPlayerHistory(username)
        };
        return socket.emit(GET_PROFILE, profile);
    });
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    /*******************
    // CHAT EVENTS    //
    *******************/
    socket.on(TYPING, ({ chatId, username, isTyping }) => {
        // sendTypingFromUser(chatId, isTyping)
        if (!username) return;
        return io.emit(`${TYPING}-${chatId}`, { username, isTyping });
    });

    socket.on(MESSAGE_SENT, async ({ chatId, message }) => {
        console.log('ACTION: ON MESSAGE_SENT');
        // **
        // maybe receive sender info from from??
        const sender = socket.user;
        if (!sender) return;
        const newMessage = await new Message({
            chatId: chatId,
            message: message,
            sender: sender
        }).save();

        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, newMessage);
    });
    //////////////////
    //////////////////
    socket.on(PRIVATE_MESSAGE, async ({ receiver, sender }) => {
        console.log('ACTION: ON PRIVATE_MESSAGE');

        // Check if user exists
        const isUserExist = await User.find({ username: receiver })
            .limit(1)
            .lean()
            .exec();
        if (!isUserExist.length) return;

        // Check if chat between exists
        const isChatExist = await Chat.find({
            users: { $size: 2, $all: [receiver, sender] }
        })
            .lean()
            .exec();
        if (isChatExist.length) return;

        // Create new chat between
        const newChat = await new Chat({ users: [receiver, sender] }).save();

        // Emit to receiver if online
        if (connectedUsers[receiver]) {
            const receiverSocket = connectedUsers[receiver].socketId;
            socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat);
        }

        // Emit back to sender
        socket.emit(PRIVATE_MESSAGE, newChat);
    });

    socket.on(LOAD_MESSAGES, async chatId => {
        const prevMessages = await Message.find({ chatId: chatId })
            .lean()
            .exec();
        socket.emit(`${LOAD_MESSAGES}-${chatId}`, prevMessages);
    });

    /******************
    // LOBBY EVENTS  //
    ******************/
    /*
    * GET ACTIVE GAMES
    */
    socket.on(GET_GAMES, async () => {
        console.log('ACTION: ON GET_GAMES');
        const activeGames = await getActiveGames();
        socket.emit(GET_GAMES, activeGames);
    });

    /*
    * GET PREVIOUS GAME MESSAGES
    */
    socket.on(JOIN_GAME, async gameId => {
        console.log('ACTION: ON JOIN_GAME');
        const gameMessages = await Message.find({ chatId: gameId })
            .lean()
            .exec();
        socket.emit(JOIN_GAME, gameMessages);
    });

    /*
    * UPDATE TEAM ROSTER - ADD
    */
    socket.on(JOIN_TEAM, async (gameId, username, targetTeam, targetIndex) => {
        console.log('ACTION: ON JOIN_TEAM');
        let newTeams = {};
        let newPlayerCount = 0;

        const game = await Game.findOne({ id: gameId })
            .lean()
            .exec();

        Object.entries(game.current_players).forEach(([teamName, teamArr]) => {
            // Remove player from team
            let newTeam = removePlayer(username, teamArr);
            // Add player if mapping through target team
            if (teamName === targetTeam && newTeam[targetIndex] === null) {
                newTeam[targetIndex] = username;
            }
            // Count total players
            newPlayerCount += newTeam.filter(Boolean).length;
            // Set
            newTeams[teamName] = newTeam;
            return;
        });
        await Game.findOneAndUpdate(
            { id: gameId },
            { filled_slots: newPlayerCount, current_players: newTeams }
        ).exec();

        const activeGames = await getActiveGames();
        io.emit(GET_GAMES, activeGames);
    });

    /*
    * UPDATE TEAM ROSTER - REMOVE
    */
    socket.on(REMOVE_PLAYER, async (gameId, username) => {
        console.log('ACTION: ON REMOVE_PLAYER');
        let newTeams = {};
        let newPlayerCount = 0;

        // Query for game
        const game = await Game.findOne({ id: gameId })
            .lean()
            .exec();
        let leader = game.lobby_leader;

        // if leader, change leader to random player
        if (game.lobby_leader === username && game.filled_slots > 1) {
            const allPlayers = [].concat.apply(
                [],
                Object.values(game.current_players)
            );
            const randomIndex = Math.floor(Math.random() * allPlayers.length);
            leader = allPlayers[randomIndex];
        }
        // Update players
        Object.entries(game.current_players).map(([teamName, teamArr]) => {
            // Remove player from team
            let newTeam = removePlayer(username, teamArr);
            // Count total players
            newPlayerCount += newTeam.filter(Boolean).length;
            // Set
            newTeams[teamName] = newTeam;
            return;
        });
        await Game.findOneAndUpdate(
            { id: gameId },
            {
                filled_slots: newPlayerCount,
                lobby_leader: leader,
                current_players: newTeams
            }
        ).exec();

        const activeGames = await getActiveGames();
        io.emit(GET_GAMES, activeGames);
    });

    /*
    * CREATE A GAME
    */
    socket.on(
        CREATE_GAME,
        async (
            gameType,
            teams,
            startDate,
            selectedLocation,
            description,
            username
        ) => {
            console.log('ACTION: ON CREATE_GAME');
            // NEW GAME
            const teamsSplit = teams.split('v').map(value => parseInt(value));
            const numOfTeams = teamsSplit.length;
            const maxSlots = teamsSplit.reduce((a, b) => a + b, 0);
            const initialTeams = {};
            teamsSplit.forEach((numOfPlayersPerTeam, iteration) => {
                const teamName = `team${iteration + 1}`;
                const initTeam = new Array(numOfPlayersPerTeam).fill(null);
                if (iteration === 0) {
                    initTeam[0] = username;
                }
                initialTeams[teamName] = initTeam;
            });
            const eventDate = new Date(startDate);
            const newGame = await new Game({
                game: gameType,
                teams: numOfTeams,
                description: description,
                max_slots: maxSlots,
                yelpLocation: {
                    id: selectedLocation.id,
                    address: selectedLocation.location.address1,
                    city: selectedLocation.location.city,
                    coordinates: selectedLocation.coordinates,
                    url: selectedLocation.url,
                    image_url: selectedLocation.image_url,
                    name: selectedLocation.name,
                    state: selectedLocation.location.state
                },
                eventDate: eventDate,
                lobby_leader: username,
                current_players: initialTeams
            }).save();
            await new Chat({ id: newGame.id }).save();
            // EMIT

            const activeGames = await getActiveGames();
            io.emit(GET_GAMES, activeGames);
            // Signal back to sender for confirmation/join
            socket.emit(CREATE_GAME, newGame.id);
        }
    );

    /*
    * DELETE
    */
    socket.on(DELETE_GAME, async (gameId, username) => {
        console.log('ACTION: ON DELETE_GAME');

        const game = await Game.findOne({ id: gameId })
            .lean()
            .exec();
        if (game.lobby_leader !== username) return;
        await Game.deleteOne({ id: gameId }).exec();

        const activeGames = await getActiveGames();
        io.emit(GET_GAMES, activeGames);
    });
};

// HELPER FUNCTIONS

// console.log('\x1bc'); //clears console

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(connectedUsers, user) {
    let newList = Object.assign({}, connectedUsers);
    newList[user.username] = user;
    return newList;
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

/* 
* Return array of games that are active
*/
function getActiveGames() {
    return Game.find({ active: true })
        .lean()
        .exec();
}

/* 
* Return array of games that are active
*/
function getInactiveGames() {
    return Game.find({ active: false }).exec();
}

/* 
* Return array of inactive games for selected player
*/
async function getPlayerUpcoming(username) {
    let results1 = await Game.find({
        active: true,
        'current_players.team1': { $elemMatch: { $in: [username] } }
    })
        .sort({ eventDate: 1 })
        .lean()
        .exec();
    let results2 = await Game.find({
        active: true,
        'current_players.team2': { $elemMatch: { $in: [username] } }
    })
        .sort({ eventDate: 1 })
        .lean()
        .exec();
}

/* 
* Return array of inactive games for selected player
*/
async function getPlayerHistory(username) {
    let results1 = await Game.find({
        active: false,
        'current_players.team1': { $elemMatch: { $in: [username] } }
    })
        .sort({ eventDate: 1 })
        .lean()
        .exec();
    let results2 = await Game.find({
        active: false,
        'current_players.team2': { $elemMatch: { $in: [username] } }
    })
        .sort({ eventDate: 1 })
        .lean()
        .exec();
    return [...results1, ...results2];
}

function getPlayerProfile(username) {
    return User.findOne({ username: username }, { password: false })
        .lean()
        .exec();
}

/*
*
*/
function removePlayer(username, teamArr) {
    return teamArr.map(player => (player === username ? null : player));
}
