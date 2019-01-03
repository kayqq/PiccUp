import { LOGIN_SUCCESS, LOGOUT, USER_HISTORY_LOAD } from '../actions/constants';

const intitialState = {
    user: {},
    gameHistory: [],
    isAuthenticated: false
};

export const userReducer = (state = intitialState, action = {}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: { ...action.payload },
                isAuthenticated: true
            };
        case LOGOUT:
            return { ...intitialState };
        case USER_HISTORY_LOAD:
            return { ...state, gameHistory: action.payload };
        default:
            return state;
    }
};
