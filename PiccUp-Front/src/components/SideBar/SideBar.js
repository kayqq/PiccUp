import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Contact from './Contact';
import Game from './Game';
import './SideBar.css';
import { filterJoinedGames, filterActiveChat } from '../../helpers';
import backIcon from '../images/icons/left-arrow.svg';
import {
    selectGame,
    selectChat,
    loadMessagesToGame,
    addMessageToGame,
    updateTypingInGame,
    changeRoute,
    logout
} from '../../actions';
import { JOIN_GAME, GET_PROFILE, LOGOUT } from '../../Events';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedName: '',
            settingsVisible: false,
            chatListVisible: false,
            messages: [],
            gamesLinkWidth: 0,
            chatLinkWidth: 0
        };
        this.gamesLink = React.createRef();
        this.chatLink = React.createRef();
    }

    componentDidMount() {
        this.setState({ gamesLinkWidth: this.gamesLink.current.offsetWidth });
        this.setState({ chatLinkWidth: this.chatLink.current.offsetWidth });
    }

    toggleProfileSettings = () => {
        this.setState(prevState => ({
            settingsVisible: !prevState.settingsVisible
        }));
    };

    switchListView = boolean => {
        // true = show Matches List
        // false = show Chat List
        const { chats, selectedChatId } = this.props;
        if (boolean) {
            this.props.changeRoute('lobbylist');
            this.setState({
                chatListVisible: false
            });
        } else if (!boolean) {
            // Set General chat to default if no selectedChatId
            if (!selectedChatId) {
                this.props.selectChat(chats[0].id);
            }
            this.props.changeRoute('chat');
            this.setState({
                chatListVisible: true
            });
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const { searchedName } = this.state;
        const { sendPrivateMessage, user } = this.props;
        if (searchedName !== user.username) {
            sendPrivateMessage(searchedName);
        }
    };

    handleViewGame = gameId => {
        const { socket } = this.props;
        this.props.initGame(gameId);
        this.props.selectGame(gameId);
        socket.emit(JOIN_GAME, gameId);
        this.props.changeRoute('lobby');
    };

    logout = () => {
        const { socket } = this.props;
        socket.emit(LOGOUT);
        socket.disconnect();
        this.props.logout();
    };

    selectChat = chatId => {
        const { socket, user, chats, selectedChatId } = this.props;
        const activeChat = filterActiveChat(chats, selectedChatId);
        const chatUsers = activeChat.users.filter(
            chatUser => chatUser !== user.username
        );
        if (chatUsers.length) socket.emit(GET_PROFILE, chatUsers[0]);
        this.props.selectChat(chatId);
        this.props.changeRoute('chat');
    };

    render() {
        const {
            chats,
            allActiveGames,
            selectedChatId,
            user,
            selectedGameId
        } = this.props;
        const {
            searchedName,
            settingsVisible,
            chatListVisible,
            gamesLinkWidth,
            chatLinkWidth
        } = this.state;
        const joinedGames = filterJoinedGames(allActiveGames, user.username);
        let activeChat;
        if (selectedChatId) {
            activeChat = filterActiveChat(chats, selectedChatId);
        }
        return (
            <div className="SideBar">
                <div className="heading">
                    {settingsVisible && (
                        <div
                            className="setting-link-back"
                            onClick={() => {
                                this.toggleProfileSettings();
                                this.props.changeRoute();
                            }}
                        >
                            <img src={backIcon} alt="" />
                        </div>
                    )}
                    <div
                        className="setting-link"
                        onClick={() => {
                            if (!settingsVisible) {
                                this.toggleProfileSettings();
                                this.props.changeRoute('profile');
                            }
                        }}
                    >
                        My Profile
                    </div>
                </div>
                <div className="body">
                    <div className="matches-message-header">
                        <div className="mmh-links">
                            <div
                                className="mmh-link"
                                ref={this.gamesLink}
                                onClick={() => this.switchListView(true)}
                            >
                                <span>Games</span>
                            </div>
                            <div
                                className="mmh-link mmh-link-messages"
                                ref={this.chatLink}
                                onClick={() => this.switchListView(false)}
                            >
                                <span>Messages</span>
                            </div>
                        </div>
                        {gamesLinkWidth &&
                            chatLinkWidth && (
                                <hr
                                    style={
                                        chatListVisible
                                            ? {
                                                  width: chatLinkWidth,
                                                  transform: `translate(${gamesLinkWidth +
                                                      16}px)`
                                              }
                                            : {
                                                  width: gamesLinkWidth,
                                                  transform: `translate(${0}px)`
                                              }
                                    }
                                    className="mmh-link-underline"
                                />
                            )}
                    </div>
                    <div className="SideBar-content">
                        <div
                            className={
                                `messaging-menu` +
                                `${!chatListVisible ? ' TranslateX100' : ''}`
                            }
                        >
                            <form onSubmit={this.handleSubmit}>
                                <div className="search">
                                    <input
                                        placeholder="Search"
                                        type="text"
                                        value={searchedName}
                                        onChange={e => {
                                            this.setState({
                                                searchedName: e.target.value
                                            });
                                        }}
                                    />
                                    <div className="plus" />
                                </div>
                            </form>
                            <div
                                className="users"
                                ref="users"
                                onClick={e => {
                                    e.target === this.refs.user &&
                                        this.props.selectChat(null);
                                }}
                            >
                                {chats.map(chat => {
                                    return (
                                        <Contact
                                            key={chat.id}
                                            chat={chat}
                                            user={user}
                                            selectChat={this.selectChat}
                                            activeChat={activeChat}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div
                            className={
                                `matches-menu` +
                                `${chatListVisible ? ' TranslateX-100' : ''}`
                            }
                        >
                            <div className="gamesearch">
                                {/* <label>
                                    <button>FIND GAME</button>
                                </label> */}
                            </div>
                            <div className="games">
                                {joinedGames &&
                                    joinedGames.map(game => {
                                        if (!game) return null;
                                        return (
                                            <Game
                                                key={game.id}
                                                selectedGameId={selectedGameId}
                                                game={game}
                                                fn={this.handleViewGame}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <div
                        className="settings-menu"
                        style={{
                            margin: settingsVisible ? '0 0 0 0' : '0 0 0 -100%'
                        }}
                    >
                        <div className="settings-item">
                            <label className="settings-item-contents">
                                <button
                                    className="logout"
                                    onClick={this.logout}
                                >
                                    Logout
                                </button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        allActiveGames: state.lobbylistReducer.allActiveGames,
        selectedGameId: state.lobbylistReducer.selectedGameId,
        chats: state.chatReducer.chats,
        selectedChatId: state.chatReducer.selectedChatId
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            selectGame,
            selectChat,
            loadMessagesToGame,
            addMessageToGame,
            updateTypingInGame,
            changeRoute,
            logout
        },
        dispatch
    );

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SideBar)
);
