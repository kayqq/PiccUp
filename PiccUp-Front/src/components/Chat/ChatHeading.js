import React from 'react';

const ChatHeading = ({ users }) => {
    return (
        <div className="ChatHeading">
            {users.length !== 0 ? users : 'General Chat'}
        </div>
    );
};

export default ChatHeading;
