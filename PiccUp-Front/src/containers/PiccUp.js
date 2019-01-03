import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import socketIOClient from 'socket.io-client';

import { filterActiveChat, filterActiveGame } from '../helpers';

import SideBar from '../components/SideBar/SideBar';
import LobbyList from '../components/LobbyList/LobbyList';
import Lobby from '../components/Lobby/Lobby';
import Chat from '../components/Chat/Chat';
import Profile from '../components/Profile/Profile';

import {
    USER_CONNECTED,
    GENERAL_CHAT,
    MESSAGE_RECEIVED,
    PRIVATE_MESSAGE,
    TYPING,
    GET_GAMES,
    CREATE_GAME,
    GET_CHATS,
    LOAD_MESSAGES,
    GET_PROFILE,
    GET_HISTORY,
    JOIN_GAME
} from '../Events';

import {
    getAllGames,
    setAllGames,
    selectGame,
    fetchYelpBusinesses,
    addChat,
    loadMessagesToChat,
    addMessageToChat,
    updateTypingInChat,
    changeRoute,
    loadChatProfile,
    loadMessagesToGame,
    addMessageToGame,
    updateTypingInGame,
    setGameHistory,
    updateUsersOnline
} from '../actions';

const socketUrl = '13.58.138.202';

class PlayLobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: socketIOClient(socketUrl)
        };
    }

    componentDidMount() {
        const { socket } = this.state;

        // initialize
        socket.emit(USER_CONNECTED, this.props.user);
        this.props.getAllGames();

        // Profile listeners
        socket.on(GET_HISTORY, gameHistory => {
            this.props.setGameHistory(gameHistory);
        });
        // Lobby listeners
        socket.on(GET_GAMES, games => {
            this.props.setAllGames(games);
        });
        socket.on(CREATE_GAME, newGameId => {
            this.initGame(newGameId);
            this.props.selectGame(newGameId);
            socket.emit(JOIN_GAME, newGameId);
            this.props.changeRoute('lobby');
        });
        socket.on(GET_PROFILE, profile => {
            this.props.loadChatProfile(profile);
        });

        socket.on(USER_CONNECTED, usersOnline => {
            this.props.updateUsersOnline(usersOnline);
        });

        // Chat listeners
        socket.on(GENERAL_CHAT, generalChat => this.initChat(generalChat));
        socket.on(GET_CHATS, existingChats => {
            existingChats.forEach(chat => this.initChat(chat));
        });
        socket.on(PRIVATE_MESSAGE, newChat => this.initChat(newChat));
    }

    sendPrivateMessage = receiver => {
        const { socket } = this.state;
        const { user } = this.props;
        socket.emit(PRIVATE_MESSAGE, { receiver, sender: user.username });
    };

    initChat = chat => {
        const { socket } = this.state;
        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`;
        const loadEvent = `${LOAD_MESSAGES}-${chat.id}`;
        const typingEvent = `${TYPING}-${chat.id}`;

        // Add chat to redux store
        this.props.addChat(chat);

        // Event listeners
        socket.on(messageEvent, newMessage => {
            this.props.addMessageToChat(chat.id, newMessage);
        });
        socket.on(loadEvent, prevMessages => {
            this.props.loadMessagesToChat(chat.id, prevMessages);
        });
        socket.on(typingEvent, ({ isTyping, username }) => {
            if (chat.id !== this.props.selectedChatId) return;
            if (username === this.props.user.username) return;
            this.props.updateTypingInChat(isTyping, username);
        });
        // Load messages
        socket.emit(LOAD_MESSAGES, chat.id);
    };

    initGame = gameId => {
        const { socket } = this.state;
        const { selectedGameId } = this.props;
        let messageEvent;
        let typingEvent;
        if (selectedGameId) {
            messageEvent = `${MESSAGE_RECEIVED}-${selectedGameId}`;
            socket.off(messageEvent);
            typingEvent = `${TYPING}-${selectedGameId}`;
            socket.off(typingEvent);
        }
        socket.on(JOIN_GAME, gameMessages => {
            this.props.loadMessagesToGame(gameMessages);
        });
        messageEvent = `${MESSAGE_RECEIVED}-${gameId}`;
        socket.on(messageEvent, newMessage => {
            this.props.addMessageToGame(newMessage);
        });
        typingEvent = `${TYPING}-${selectedGameId}`;
        socket.on(typingEvent, ({ isTyping, username }) => {
            if (username === this.props.user.username) return;
            this.props.updateTypingInGame(isTyping, username);
        });
    };

    render() {
        const {
            allActiveGames,
            chats,
            selectedChatId,
            selectedGameId
        } = this.props;
        let activeChat;
        if (selectedChatId) {
            activeChat = filterActiveChat(chats, selectedChatId);
        }

        let activeGame;
        if (selectedGameId)
            activeGame = filterActiveGame(allActiveGames, selectedGameId);

        return (
            <div className="PiccUp">
                <SideBar
                    socket={this.state.socket}
                    initGame={this.initGame}
                    sendPrivateMessage={this.sendPrivateMessage}
                />
                <div className="Main-Window">
                    {this.props.route === 'chat' ? (
                        <Chat
                            socket={this.state.socket}
                            user={this.props.user}
                            typingUsers={this.props.typingUsers}
                            activeChatProfile={this.props.activeChatProfile}
                            activeChat={activeChat}
                            usersOnline={this.props.usersOnline}
                        />
                    ) : this.props.route === 'lobby' ? (
                        <Lobby
                            socket={this.state.socket}
                            activeGame={activeGame}
                        />
                    ) : this.props.route === 'profile' ? (
                        <Profile
                            socket={this.state.socket}
                            user={this.props.user}
                            gameHistory={this.props.gameHistory}
                        />
                    ) : (
                        <LobbyList
                            socket={this.state.socket}
                            user={this.props.user}
                            initGame={this.initGame}
                            getGames={this.props.getAllGames}
                            allActiveGames={this.props.allActiveGames}
                            yelpSearchResults={this.props.yelpSearchResults}
                            selectedGameId={this.props.selectedGameId}
                            fetchYelpBusinesses={this.props.fetchYelpBusinesses}
                            selectGame={this.props.selectGame}
                            changeRoute={this.props.changeRoute}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        route: state.appReducer.route,
        user: state.userReducer.user,
        gameHistory: state.userReducer.gameHistory,
        allActiveGames: state.lobbylistReducer.allActiveGames,
        selectedGameId: state.lobbylistReducer.selectedGameId,
        yelpSearchResults: state.lobbylistReducer.yelpSearchResults.businesses,
        chats: state.chatReducer.chats,
        usersOnline: state.chatReducer.usersOnline,
        typingUsers: state.chatReducer.typingUsers,
        selectedChatId: state.chatReducer.selectedChatId,
        activeChatProfile: state.chatReducer.activeChatProfile
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getAllGames,
            setAllGames,
            selectGame,
            fetchYelpBusinesses,
            addChat,
            loadMessagesToChat,
            addMessageToChat,
            updateTypingInChat,
            changeRoute,
            loadChatProfile,
            setGameHistory,
            loadMessagesToGame,
            addMessageToGame,
            updateTypingInGame,
            updateUsersOnline
        },
        dispatch
    );

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PlayLobby)
);
