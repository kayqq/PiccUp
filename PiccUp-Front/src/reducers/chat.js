import {
    CHAT_ADD,
    MESSAGES_LOAD,
    MESSAGE_ADD,
    TYPING_UPDATE,
    CHAT_SELECT,
    CHAT_PROFILE_LOAD,
    CHAT_USERS_ONLINE_UPDATE,
    LOGOUT
} from '../actions/constants';

const intitialState = {
    usersOnline: [],
    chats: [],
    selectedChatId: '',
    activeChatProfile: {},
    typingUsers: []
};

export const chatReducer = (state = intitialState, action = {}) => {
    switch (action.type) {
        case CHAT_ADD:
            action.payload.messages = []; // init messages array
            return { ...state, chats: [...state.chats, action.payload] };
        case MESSAGES_LOAD:
            let newChatsLoad = state.chats.map(chat => {
                if (chat.id === action.payload.chatId) {
                    chat.messages = [...action.payload.prevMessages];
                }
                return chat;
            });
            return { ...state, chats: newChatsLoad };
        case MESSAGE_ADD:
            let newChatsAdd = state.chats.map(chat => {
                if (chat.id === action.payload.chatId) {
                    chat.messages = [
                        ...chat.messages,
                        action.payload.newMessage
                    ];
                }
                return chat;
            });
            return { ...state, chats: newChatsAdd };
        case TYPING_UPDATE:
            const { isTyping, username } = action.payload;
            let newTypingUsers;
            if (isTyping && !state.typingUsers.includes(username)) {
                newTypingUsers = [...state.typingUsers, username];
            } else if (!isTyping && state.typingUsers.includes(username)) {
                newTypingUsers = state.typingUsers.filter(u => u !== username);
            }
            return { ...state, typingUsers: newTypingUsers };
        case CHAT_SELECT:
            return {
                ...state,
                selectedChatId: action.payload,
                typingUsers: []
            };
        case CHAT_PROFILE_LOAD:
            return { ...state, activeChatProfile: action.payload };
        case CHAT_USERS_ONLINE_UPDATE:
            return { ...state, usersOnline: action.payload };
        case LOGOUT:
            return {
                ...state,
                chats: [],
                selectedChatId: '',
                activeChatProfile: {}
            };
        default:
            return state;
    }
};
