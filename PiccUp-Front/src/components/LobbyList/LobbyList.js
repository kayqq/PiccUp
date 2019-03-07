import React from 'react';
import ReactTable from 'react-table';

import ModalCreateGame from './ModalCreateGame';
import Columns from './LobbyListColumns';
import { JOIN_GAME, GET_GAMES } from '../../Events';
import './LobbyList.css';
import refreshIcon from '../images/icons/refreshIcon.png';

class LobbyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowIndex: null,
            modalIsOpen: false
        };
    }

    loadLobby = () => {
        const { socket } = this.props;
        socket.emit(GET_GAMES);
        this.props.getGames();
        this.setState({
            selectedRowIndex: null
        });
    };

    handleViewGame = gameId => {
        const { socket } = this.props;
        this.props.initGame(gameId);
        this.props.selectGame(gameId);
        socket.emit(JOIN_GAME, gameId);
        this.props.changeRoute('lobby');
    };

    getTrProps = (state, rowInfo) => {
        return {
            onClick: e => {
                this.props.selectGame(rowInfo.original.id);
                this.setState({
                    selectedRowIndex: rowInfo.index
                });
            },
            style: {
                background:
                    rowInfo && rowInfo.index === this.state.selectedRowIndex
                        ? 'rgba(79, 56, 255, 1)'
                        : 'white',
                color:
                    rowInfo && rowInfo.index === this.state.selectedRowIndex
                        ? 'white'
                        : 'black'
            }
        };
    };

    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    render() {
        return (
            <div className="display">
                <div className="helper-labels">
                    <div className="btn-label" onClick={this.loadLobby}>
                        <span>Refresh </span>
                        <img src={refreshIcon} alt="" />
                    </div>
                </div>
                <ReactTable
                    data={this.props.allActiveGames}
                    columns={Columns}
                    loading={this.props.isLoading}
                    getTrProps={this.getTrProps}
                    defaultPageSize={18}
                    showPagination={false} // may need to renable
                    showPageSizeOptions={false}
                    resizable={false}
                    // style={{ height: '400px' }}
                    className="LobbyList"
                />
                <div className="helper-buttons">
                    <button className="btn" onClick={this.openModal}>
                        Create Game
                    </button>
                    <button
                        className="btn"
                        disabled={!this.props.selectedGameId}
                        onClick={() => {
                            this.handleViewGame(this.props.selectedGameId);
                        }}
                    >
                        Join Game
                    </button>
                </div>
                <ModalCreateGame
                    socket={this.props.socket}
                    user={this.props.user}
                    createGame={this.props.createGame}
                    yelpSearchResults={this.props.yelpSearchResults}
                    fetchYelpBusinesses={this.props.fetchYelpBusinesses}
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

export default LobbyList;
