import React from 'react';
import { calcDaysAgo } from '../../helpers';

import basketballIcon from '../images/icons/basketball.svg';

const GameHistory = ({ gameHistory }) => {
    const renderMatch = match => {
        const perTeam = match.max_slots / match.teams;
        return (
            <div key={match.id} className="match-detail">
                <div className="match-img">
                    <img src={basketballIcon} alt="sports icon" />
                </div>
                <div className="match-info-item match-game">
                    <span>{match.game}</span>
                </div>
                <div className="match-info-item match-team">
                    <span>{perTeam + 'v' + perTeam}</span>
                </div>
                <div className="match-info-item match-outcome">
                    <span>W</span>
                </div>
                <div className="match-info-item match-date">
                    <span>{calcDaysAgo(match.eventDate)} Days Ago</span>
                </div>
            </div>
        );
    };

    // <img src={'https://image.flaticon.com/icons/svg/1218/1218225.svg'} />;

    return (
        <div className="match-history-container">
            <div className="match-history-thread">
                {gameHistory && gameHistory.map(match => renderMatch(match))}
            </div>
        </div>
    );
};

export default GameHistory;
