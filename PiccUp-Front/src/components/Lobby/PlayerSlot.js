import React from 'react';

const PlayerSlot = ({
    player,
    color,
    index,
    user,
    activeGame,
    handleRemovePlayer
}) => {
    return (
        <div
            className="lobby-player"
            key={index}
            style={{
                background:
                    color === 1 ? 'rgba(255,69,23,1)' : 'rgba(79,56,255,1)',
                border:
                    activeGame.lobby_leader === player
                        ? 'solid rgba(255, 174, 0, 1) 2px'
                        : 'unset',
                padding: activeGame.lobby_leader === player ? '3px' : '5px'
            }}
        >
            <div className="player-avatar" />
            <div className="player-details">
                <div className="player-name">{player}</div>
                {player !== user.username &&
                    activeGame.lobby_leader === user.username && (
                        <div
                            className="lobby-remove"
                            onClick={() =>
                                handleRemovePlayer(player, activeGame.id)
                            }
                        >
                            X
                        </div>
                    )}
            </div>
        </div>
    );
};

export default PlayerSlot;
