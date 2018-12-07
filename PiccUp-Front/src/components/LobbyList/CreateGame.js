import React from 'react';

const CreateGame = ({ openModal }) => {
    return (
        <button className="btn" onClick={openModal}>
            Create Game
        </button>
    );
};

export default CreateGame;
