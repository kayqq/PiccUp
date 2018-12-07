import React from 'react';

const UsersOnlineList = ({ usersOnline }) => {
    return (
        <div className="UsersOnlineList">
            <div className="online-header">Online</div>
            {usersOnline.map((user, index) => {
                return (
                    <div className="online-user" key={index}>
                        <div className="user-avatar" />
                        <div className="user-details">
                            <div className="user-name">{user}</div>
                            <span className="online-dot" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UsersOnlineList;
