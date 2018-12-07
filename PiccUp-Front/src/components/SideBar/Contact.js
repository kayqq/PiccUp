import React from 'react';

const Contact = ({ user, chat, selectChat, activeChat }) => {
    if (!chat.id) return null;
    const lastMessage = chat.messages[chat.messages.length - 1];
    const chatSideName =
        chat.users.find(name => name !== user.username) || 'General';
    const classNames = activeChat && activeChat.id === chat.id ? 'active' : '';
    return (
        <div
            className={`user ${classNames}`}
            onClick={() => {
                selectChat(chat.id);
            }}
        >
            <div className="user-photo">{chatSideName[0].toUpperCase()}</div>
            <div className="user-info">
                <div className="name">{chatSideName}</div>
                {lastMessage && (
                    <div className="last-message">{lastMessage.message}</div>
                )}
            </div>
        </div>
    );
};

export default Contact;
