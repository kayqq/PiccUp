import React from 'react';
import ProfileInfo from './ProfileInfo';
import GameHistory from './GameHistory';
import defaultAvatar from '../images/icons/default-avatar.png';
import './Profile.css';

const Profile = ({ user, gameHistory }) => {
    return (
        <div className="display">
            <div className="User-Profile">
                <div className="user-profile-container">
                    <div className="user-profile-image">
                        <img src={defaultAvatar} alt="" />
                    </div>
                    <div className="user-profile-block">
                        <ProfileInfo
                            user={user}
                            gamesPlayed={gameHistory.length}
                        />
                    </div>
                </div>
                <div className="user-profile-matches">
                    <GameHistory gameHistory={gameHistory} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
