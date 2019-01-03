import {
    GAME_MESSAGES_LOAD,
    GAME_MESSAGE_ADD,
    GAME_TYPING_UPDATE,
    LOGOUT
} from '../actions/constants';

const intitialState = {
    messages: [],
    typingUsers: []
};

export const lobbyReducer = (state = intitialState, action = {}) => {
    switch (action.type) {
        case GAME_MESSAGES_LOAD:
            return { ...state, messages: [...action.payload] };
        case GAME_MESSAGE_ADD:
            return { ...state, messages: [...state.messages, action.payload] };
        case GAME_TYPING_UPDATE:
            const { isTyping, username } = action.payload;
            let newTypingUsers;
            if (isTyping && !state.typingUsers.includes(username)) {
                newTypingUsers = [...state.typingUsers, username];
            } else if (!isTyping && state.typingUsers.includes(username)) {
                newTypingUsers = state.typingUsers.filter(u => u !== username);
            }
            return { ...state, typingUsers: newTypingUsers };
        case LOGOUT:
            return { ...intitialState };
        default:
            return state;
    }
};
