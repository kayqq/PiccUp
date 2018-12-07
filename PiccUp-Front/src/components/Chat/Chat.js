import React from 'react';

import ChatHeading from './ChatHeading';
import Messages from './Messages';
import MessageInput from './MessageInput';
import ChatProfile from './ChatProfile';
import UsersOnlineList from './UsersOnlineList';

import './Chat.css';

import { MESSAGE_SENT, TYPING } from '../../Events';

const Chat = ({
    socket,
    activeChat,
    user,
    activeChatProfile,
    typingUsers,
    usersOnline
}) => {
    const sendMessage = (chatId, message) => {
        socket.emit(MESSAGE_SENT, { chatId, message });
    };

    const sendTyping = (chatId, isTyping) => {
        const username = user.username;
        socket.emit(TYPING, { chatId, username, isTyping });
    };

    const getChatUsers = activeChatUsers => {
        const chatName = activeChatUsers.filter(
            chatUser => chatUser !== user.username
        );
        return chatName;
    };
    return (
        <div className="ChatMain">
            <div className="Chat">
                <ChatHeading
                    users={
                        // activeChat.users
                        getChatUsers(activeChat.users)
                    }
                />
                <Messages
                    messages={activeChat.messages}
                    user={user}
                    typingUsers={typingUsers}
                />
                <MessageInput
                    sendMessage={message => sendMessage(activeChat.id, message)}
                    sendTyping={isTyping => sendTyping(activeChat.id, isTyping)}
                />
            </div>
            {activeChat.users.length && activeChatProfile.history ? (
                <ChatProfile chatProfile={activeChatProfile} />
            ) : (
                <UsersOnlineList usersOnline={usersOnline} />
            )}
        </div>
    );
};

export default Chat;
