import React from 'react';
import { formatTime, formatDay, formatDate } from '../../helpers';

const GameInfo = ({ gameInfo }) => {
    const perTeam = gameInfo.max_slots / gameInfo.teams;
    return (
        <React.Fragment>
            <div className="lobby-setting">
                <div className="setting-name">
                    <span>Game</span>
                </div>
                <div className="setting-info">
                    <span>{gameInfo.game}</span>
                </div>
            </div>

            <div className="lobby-setting">
                <div className="setting-name">
                    <span>Teams</span>
                </div>
                <div className="setting-info">
                    <span>{perTeam + 'v' + perTeam}</span>
                </div>
            </div>

            <div className="lobby-setting">
                <div className="setting-name">
                    <span>Location</span>
                </div>
                <div className="location-display">
                    <div
                        className="ld-img"
                        style={{
                            backgroundImage: `url(${gameInfo.yelpLocation
                                .image_url || null})`
                        }}
                    />

                    <div className="ld-details">
                        <div className="ld-info">
                            <div className="ld-name">
                                {gameInfo.yelpLocation.name || null}
                            </div>
                            <div className="ld-address">
                                {`${gameInfo.yelpLocation.address}, ${
                                    gameInfo.yelpLocation.city
                                }, ${gameInfo.yelpLocation.state}` || null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lobby-setting">
                <div className="setting-name">
                    <span>Event Date</span>
                </div>
                <div className="setting-info">
                    <span>{formatDay(gameInfo.eventDate)}</span>
                    <span>{formatDate(gameInfo.eventDate)}</span>
                    <span>@ {formatTime(gameInfo.eventDate)}</span>
                </div>
            </div>

            <div className="lobby-setting">
                <div className="setting-name">
                    <span>Players</span>
                </div>
                <div className="setting-info">
                    <span>
                        {gameInfo.filled_slots} / {gameInfo.max_slots}
                    </span>
                </div>
            </div>

            <div className="lobby-setting">
                <div className="setting-name">
                    <span>Lobby Leader</span>
                </div>
                <div className="setting-info">
                    <span>{gameInfo.lobby_leader}</span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default GameInfo;
