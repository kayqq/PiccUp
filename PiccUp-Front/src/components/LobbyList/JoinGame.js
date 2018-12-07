import React from 'react';
import { Route } from 'react-router-dom';

const JoinGame = ({ selectedGameId, handleViewGame }) => {
    return (
        <Route
            render={({ history }) => (
                <button
                    className="btn"
                    disabled={!selectedGameId}
                    onClick={() => {
                        // history.push(`/lobby:${selectedRow.id}`)
                        handleViewGame(selectedGameId);
                    }}
                >
                    Join Game
                </button>
            )}
        />
    );
};

export default JoinGame;
