import React from 'react';
import basketballIcon from '../images/icons/basketball.svg';
import { calcDaysUntil } from '../../helpers';
const Game = ({ game, fn, selectedGameId }) => {
    const perTeam = game.max_slots / game.teams;
    const classNames = selectedGameId === game.id ? 'active' : '';
    return (
        <div
            onClick={() => (fn ? fn(game.id) : null)}
            className={`game ${classNames}`}
        >
            <div className="game-img">
                <img src={basketballIcon} alt="sports icon" />
            </div>
            <div className="game-info-item game-game">
                <span>{game.game}</span>
            </div>
            <div className="game-info-item game-team">
                <span>{perTeam + 'v' + perTeam}</span>
            </div>
            <div className="game-info-item game-date">
                <span>In {calcDaysUntil(game.eventDate)} Days</span>
            </div>
        </div>
    );
};

export default Game;
