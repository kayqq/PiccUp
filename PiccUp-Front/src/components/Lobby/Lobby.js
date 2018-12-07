import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Map from './Map';
import GameMessages from './GameMessages';
import GameMessageInput from './GameMessageInput';
import GameInfo from './GameInfo';
import LeaderOptions from './LeaderOptions';
import {
    loadMessagesToGame,
    addMessageToGame,
    updateTypingInGame,
    changeRoute
} from '../../actions';
import {
    MESSAGE_SENT,
    TYPING,
    JOIN_TEAM,
    REMOVE_PLAYER,
    DELETE_GAME
} from '../../Events';
import './Lobby.css';
import PlayerSlot from './PlayerSlot';
import EmptySlot from './EmptySlot';
// import backArrow from '../images/icons/back-left-arrow-icon.svg';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderOptionsSelected: false
        };
    }

    toggleLeaderOptions = boolean => {
        this.setState({
            leaderOptionsSelected: boolean
        });
    };

    handleJoinTeam = (team, index, activeGame) => {
        const { socket, user } = this.props;
        socket.emit(JOIN_TEAM, activeGame.id, user.username, team, index);
    };

    handleRemovePlayer = (player, gameId) => {
        const { socket } = this.props;
        socket.emit(REMOVE_PLAYER, gameId, player);
    };

    handleDeleteGame = (gameId, username) => {
        const { socket, changeRoute } = this.props;
        socket.emit(DELETE_GAME, gameId, username);
        changeRoute('lobbylist');
    };

    sendMessage = (chatId, message) => {
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, { chatId, message });
    };

    sendTyping = (chatId, isTyping) => {
        const { socket, user } = this.props;
        const username = user.username;
        socket.emit(TYPING, { chatId, username, isTyping });
    };

    renderTeams = activeGame => {
        if (!activeGame) return;
        const currentTeams = activeGame.current_players;
        if (currentTeams) {
            return Object.entries(currentTeams).map((key, teamIndex) => {
                // key = ["team1", [1, 2]]
                return (
                    <div className="lobby-child-team" key={key[0]}>
                        {key[1].map((player, index) => {
                            // key[1] = [1, 2]
                            if (player) {
                                return (
                                    <PlayerSlot
                                        key={index}
                                        player={player}
                                        color={teamIndex + 1}
                                        index={index}
                                        user={this.props.user}
                                        activeGame={activeGame}
                                        handleRemovePlayer={
                                            this.handleRemovePlayer
                                        }
                                    />
                                );
                            } else {
                                return (
                                    <EmptySlot
                                        key={index}
                                        teamName={key[0]}
                                        index={index}
                                        activeGame={activeGame}
                                        handleJoinTeam={this.handleJoinTeam}
                                    />
                                );
                            }
                        })}
                    </div>
                );
            });
        }
    };

    render() {
        const { leaderOptionsSelected } = this.state;
        const { user, activeGame, messages, typingUsers } = this.props;
        // const isLobbyLeader = activeGame.lobby_leader === user.username;
        if (!activeGame) return this.props.changeRoute('lobbylist');
        return (
            <div className="display">
                <div className="helper-labels">
                    <div
                        className="btn-label"
                        onClick={() => {
                            this.props.changeRoute('lobbylist');
                        }}
                    >
                        <span>Back</span>
                        {/* <img src={backArrow} alt="" /> */}
                    </div>
                </div>
                <div className="Lobby">
                    <div className="lobby-main-left">
                        <div className="lobby-main-left-top">
                            <div className="team-title">
                                <div>
                                    <span>Team 1</span>
                                </div>
                                <div>
                                    <span>Team 2</span>
                                </div>
                            </div>
                            <div className="team-render">
                                {this.renderTeams(activeGame)}
                            </div>
                        </div>
                        <div className="lobby-main-left-bot">
                            <GameMessages
                                messages={messages}
                                user={user}
                                typingUsers={typingUsers}
                            />
                            <GameMessageInput
                                sendMessage={message =>
                                    this.sendMessage(activeGame.id, message)
                                }
                                sendTyping={isTyping =>
                                    this.sendTyping(activeGame.id, isTyping)
                                }
                            />
                        </div>
                    </div>
                    <div className="lobby-main-right">
                        <div className="lobby-main-right-top">
                            <div className="lobby-map">
                                {activeGame &&
                                    activeGame.yelpLocation && (
                                        <Map
                                            // url={activeGame.yelpLocation.url}
                                            lat={
                                                activeGame.yelpLocation
                                                    .coordinates.latitude
                                            }
                                            lng={
                                                activeGame.yelpLocation
                                                    .coordinates.longitude
                                            }
                                        />
                                    )}
                            </div>
                        </div>
                        <div className="lobby-main-right-mid">
                            <ul className="tabrow">
                                <li
                                    className={
                                        leaderOptionsSelected ? '' : 'selected'
                                    }
                                    onClick={() =>
                                        this.toggleLeaderOptions(false)
                                    }
                                >
                                    Game Info
                                </li>
                                {activeGame.lobby_leader === user.username && (
                                    <li
                                        className={
                                            leaderOptionsSelected
                                                ? 'selected'
                                                : ''
                                        }
                                        onClick={() =>
                                            this.toggleLeaderOptions(true)
                                        }
                                    >
                                        Leader Options
                                    </li>
                                )}
                            </ul>
                            <div className="lobby-gameinfo">
                                {!leaderOptionsSelected &&
                                    activeGame.yelpLocation && (
                                        <GameInfo gameInfo={activeGame} />
                                    )}
                                {leaderOptionsSelected && (
                                    <LeaderOptions
                                        handleDeleteGame={() => {
                                            this.handleDeleteGame(
                                                activeGame.id,
                                                user.username
                                            );
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="lobby-main-right-bot">
                            <div className="lobby-buttons">
                                <button
                                    className="btn btn-lobby btn-cancel "
                                    onClick={() =>
                                        this.handleRemovePlayer(
                                            this.props.user.username,
                                            activeGame.id
                                        )
                                    }
                                >
                                    Leave Game
                                </button>
                            </div>
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
        messages: state.lobbyReducer.messages,
        typingUsers: state.lobbyReducer.typingUsers
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadMessagesToGame,
            addMessageToGame,
            updateTypingInGame,
            changeRoute
        },
        dispatch
    );

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Lobby)
);
