import React from 'react';

const EmptySlot = ({ teamName, index, activeGame, handleJoinTeam }) => {
    return (
        <div
            className="lobby-player empty"
            key={index}
            onClick={() => handleJoinTeam(teamName, index, activeGame)}
        >
            <span>Empty Slot</span>
        </div>
    );
};

export default EmptySlot;
