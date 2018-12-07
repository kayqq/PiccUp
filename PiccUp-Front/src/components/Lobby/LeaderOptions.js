import React from 'react';

const LeaderOptions = ({ handleDeleteGame }) => {
    return (
        <React.Fragment>
            <div className="lobby-setting">
                <button
                    className="btn"
                    onClick={() => {
                        handleDeleteGame();
                    }}
                >
                    Delete Game
                </button>
            </div>
        </React.Fragment>
    );
};

export default LeaderOptions;
