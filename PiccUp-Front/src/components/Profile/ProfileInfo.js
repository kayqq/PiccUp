import React from 'react';
import { formatDate } from '../../helpers';

const ProfileInfo = ({ user, gamesPlayed }) => {
    return (
        user && (
            <div className="user-profile-details">
                <div className="user-profile-header">
                    <div className="user-profile-header-name">
                        <span>{user.username}</span>
                    </div>
                    {/* <div className="user-profile-header-rank">
                        <span>Rank 1731**</span>
                    </div> */}
                </div>
                <div className="user-profile-info">
                    <div className="user-profile-item">
                        <span>Location: </span>
                        <span>
                            {user.city}, {user.state}
                        </span>
                    </div>
                    <div className="user-profile-item">
                        <span>Games Played: </span>
                        <span>{gamesPlayed}</span>
                    </div>
                    <div className="user-profile-item">
                        <span>Joined: </span>
                        <span>{formatDate(user.joined)}</span>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProfileInfo;
