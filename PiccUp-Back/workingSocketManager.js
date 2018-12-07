const io = require('./server').io;
const db = require('./server').db;
const uuidv4 = require('uuid/v4');

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
    PULL_GAMES,
    JOIN_TEAM,
    JOIN_GAME,
    PUSH_GAMES,
    PUSHED_NEW_GAME,
    CHAT_LIST,
    LOAD_MESSAGES,
    REMOVE_PLAYER,
    GET_PROFILES,
    GET_HISTORY
} = require('./Events');

const { createMessage, createChat } = require('./Factories');

let connectedUsers = {};

let generalChat = createChat();

module.exports = function(socket) {
    /******************
    // CONECT EVENTS //
    ******************/
    console.log('Socket Id:' + socket.id);

    // User Connects with username
    socket.on(USER_CONNECTED, user => {
        console.log('User connected: ' + user.username);
        user.socketId = socket.id;
        socket.user = user.username; // for other socket uses
        // add user to connected list
        connectedUsers = addUser(connectedUsers, user);

        // client initialization
        socket.emit(GENERAL_CHAT, generalChat);
        const existingChats = getUserChats(user.username);
        socket.emit(CHAT_LIST, existingChats);

        io.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);
    });

    //User logout
    socket.on(LOGOUT, () => {
        connectedUsers = removeUser(connectedUsers, socket.user);
        io.emit(USER_DISCONNECTED, connectedUsers);
        console.log('User disconnected: ' + socket.user);
        console.log(connectedUsers);
    });

    //User disconnects
    socket.on('disconnect', () => {
        if ('user' in socket) {
            console.log('User disconnected: ' + socket.user);
        }
    });

    /*******************
    // Profile EVENTS //
    *******************/
    socket.on(GET_HISTORY, username => {
        socket.emit(GET_HISTORY, getPlayerHistory(username));
    });

    /*******************
    // CHAT EVENTS    //
    *******************/

    socket.on(GET_PROFILES, arrayChatUser => {
        const profiles = [];
        arrayChatUser.map(username => {
            const profile = {
                profile: getPlayerProfile(username),
                history: getPlayerHistory(username)
            };
            profiles.push(profile);
        });
        // const playerInfo = getPlayerProfile(arrayChatUser[0]);
        // const history = getPlayerHistory(arrayChatUser[0]);
        // const profile = {
        //     profile: playerInfo,
        //     history: history
        // };
        socket.emit(GET_PROFILES, profiles);
    });

    socket.on(TYPING, ({ chatId, username, isTyping }) => {
        // sendTypingFromUser(chatId, isTyping)
        if (username) {
            io.emit(`${TYPING}-${chatId}`, { username, isTyping });
        }
    });

    socket.on(MESSAGE_SENT, ({ chatId, message }) => {
        const sender = socket.user;
        if (sender) {
            const newMessage = createMessage({ message, sender, chatId });
            db.messages.push(newMessage);
            io.emit(`${MESSAGE_RECEIVED}-${chatId}`, newMessage);
        }
    });

    socket.on(PRIVATE_MESSAGE, ({ receiver, sender }) => {
        // if user in database, not existing in receiver chat, not existing in sender chat
        if (db.users2.get(receiver) && !isChatExist(receiver, sender)) {
            const newChat = createChat({ users: [receiver, sender] });
            db.chats.push(newChat);
            // push message to receiver if online
            if (connectedUsers[receiver]) {
                const receiverSocket = connectedUsers[receiver].socketId;
                socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat);
            }
            socket.emit(PRIVATE_MESSAGE, newChat);
        }
    });

    socket.on(LOAD_MESSAGES, chatId => {
        const prevMessages = db.messages.filter(
            message => message.chatId === chatId
        );
        socket.emit(`${LOAD_MESSAGES}-${chatId}`, prevMessages);
    });

    /******************
    // LOBBY EVENTS  //
    ******************/

    // GET / READ
    socket.emit(PUSH_GAMES, getActiveGames(db.gamesData));

    socket.on(PULL_GAMES, () => {
        socket.emit(PUSH_GAMES, getActiveGames(db.gamesData));
    });

    socket.on(JOIN_GAME, gameId => {
        gameMessages = db.messages.filter(message => message.chatId === gameId);
        socket.emit(JOIN_GAME, gameMessages);
    });

    // UPDATE
    socket.on(JOIN_TEAM, (gameId, username, team, targetIndex) => {
        db.gamesData.forEach(lobby => {
            if (lobby.id === gameId) {
                const newTeams = {};
                let newPlayerCount = 0;
                Object.entries(lobby.current_players).map(([key, value]) => {
                    // map through and turn existing spot to null if in team
                    const filteredTeamObj = {
                        [key]: value.map(
                            player => (player === username ? null : player)
                        )
                    };
                    // turn null index spot to username if mapping through selected team
                    if (key === team) {
                        filteredTeamObj[key] = filteredTeamObj[key].map(
                            (player, indexPos) =>
                                indexPos === targetIndex && player === null
                                    ? username
                                    : player
                        );
                    }
                    // count existing players and update gameInfo
                    filteredTeamObj[key].forEach(
                        player =>
                            player !== null ? (newPlayerCount += 1) : null
                    );
                    return Object.assign(newTeams, filteredTeamObj);
                });
                Object.assign(lobby.current_players, newTeams);
                lobby.filled_slots = newPlayerCount;
            }
        });
        io.sockets.emit(JOIN_TEAM, getActiveGames(db.gamesData));
    });

    socket.on(REMOVE_PLAYER, (username, gameId) => {
        db.gamesData.forEach(lobby => {
            if (lobby.id === gameId) {
                // change leader
                if (lobby.lobby_leader === username) {
                    const allPlayers = [].concat.apply(
                        [],
                        Object.values(lobby.current_players)
                    );
                    randomPlayer =
                        allPlayers[
                            Math.floor(Math.random() * allPlayers.length)
                        ];
                    lobby.lobby_leader = randomPlayer;
                }
                // updating players
                const newTeams = {};
                let newPlayerCount = 0;
                Object.entries(lobby.current_players).map(([key, value]) => {
                    // map through and turn existing spot to null if in team
                    const filteredTeamObj = {
                        [key]: value.map(
                            player => (player === username ? null : player)
                        )
                    };
                    // count existing players and update gameInfo
                    filteredTeamObj[key].forEach(
                        player =>
                            player !== null ? (newPlayerCount += 1) : null
                    );
                    return Object.assign(newTeams, filteredTeamObj);
                });
                Object.assign(lobby.current_players, newTeams);
                lobby.filled_slots = newPlayerCount;
            }
        });
        io.sockets.emit(JOIN_TEAM, getActiveGames(db.gamesData));
    });

    // CREATE
    socket.on(
        CREATE_GAME,
        (gameType, teams, selectedLocation, description, username) => {
            // NEW GAME
            const teamsSplit = teams.split('v').map(value => parseInt(value));
            const numOfTeams = teamsSplit.length;
            const maxSlots = teamsSplit.reduce((a, b) => a + b, 0);

            const initialTeams = {};
            teamsSplit.forEach((numOfPlayersPerTeam, index) => {
                const initTeam = new Array(numOfPlayersPerTeam).fill(null);
                if (index === 0) {
                    initTeam.splice(0, 1, username);
                }
                const team = { [`team${index + 1}`]: initTeam };
                Object.assign(initialTeams, team);
            });

            const id = uuidv4();

            const newGameChat = { id: id };

            const newGame = {
                id: id,
                active: true,
                current_players: initialTeams,
                description: description,
                eventDate: new Date(),
                filled_slots: 1,
                game: gameType,
                lobby_leader: username,
                max_slots: maxSlots,
                teams: numOfTeams,
                yelpLocation: {
                    id: selectedLocation.id,
                    address: selectedLocation.location.address1,
                    city: selectedLocation.location.city,
                    coordinates: selectedLocation.coordinates,
                    url: selectedLocation.url,
                    image_url: selectedLocation.image_url,
                    name: selectedLocation.name,
                    state: selectedLocation.location.state
                }
            };
            // CREATE NEW GAME
            db.gamesData.push(newGame);
            // CREATE NEW GAME CHAT
            db.chats.push(newGameChat);
            // EMIT
            const newGameId = db.gamesData[db.gamesData.length - 1].id;
            socket.emit(CREATE_GAME, getActiveGames(db.gamesData), newGameId);
            socket.broadcast.emit(
                PUSHED_NEW_GAME,
                getActiveGames(db.gamesData)
            );
        }
    );

    // DELETE
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
* Returns boolean depending if 
*/
function isChatExist(usernameOne, usernameTwo) {
    const found = db.chats.find(chat => {
        if (chat.length > 0) {
            return (
                chat.users.length === 2 &&
                chat.users.includes(usernameOne) &&
                chat.users.includes(usernameTwo)
            );
        }
    });
    if (found) {
        return true;
    } else {
        return false;
    }
}

/*
* Returns list of chats currently participating in
*/
function getUserChats(username) {
    return db.chats.map(chat => {
        if (chat.users.includes(username)) {
            return chat;
        }
    });
}

/* 
* Return array of games that are active
*/
function getActiveGames() {
    const activeGames = db.gamesData.filter(game => game.active === true);
    return activeGames;
}

/* 
* Return array of games that are active
*/
function getInactiveGames() {
    const inactiveGames = db.gamesData.filter(game => game.active === false);
    return inactiveGames;
}

/* 
* Return player profile object
*/
function getPlayerProfile(username) {
    const profile = db.users2.get(username);
    return profile;
}

/* 
* Return array of inactive games for selected player
*/
function getPlayerHistory(username) {
    const inactiveGames = getInactiveGames();
    const playerHistory = inactiveGames.filter(lobby => {
        const allPlayers = [].concat.apply(
            [],
            Object.values(lobby.current_players)
        );
        return allPlayers.includes(username);
    });
    return playerHistory;
}
