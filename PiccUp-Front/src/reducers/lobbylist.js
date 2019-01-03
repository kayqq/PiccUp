import {
    ALL_ACTIVE_GAMES_REQUESTED,
    ALL_ACTIVE_GAMES_UPDATED,
    GAME_SELECT,
    FETCH_YELP_BUSINESSES_SUCCESS,
    LOGOUT
} from '../actions/constants';

const intitialState = {
    allActiveGames: [],
    isLoading: true,
    selectedGameId: '',
    yelpSearchResults: []
};

export const lobbylistReducer = (state = intitialState, action = {}) => {
    switch (action.type) {
        case ALL_ACTIVE_GAMES_REQUESTED:
            return { ...state, selectedGameId: '', isLoading: true };
        case ALL_ACTIVE_GAMES_UPDATED:
            return {
                ...state,
                allActiveGames: action.payload,
                isLoading: false
            };
        case GAME_SELECT:
            return { ...state, selectedGameId: action.payload };
        case FETCH_YELP_BUSINESSES_SUCCESS:
            return { ...state, yelpSearchResults: action.payload };
        case LOGOUT:
            return { ...state, selectedGameId: '', yelpSearchResults: [] };
        default:
            return state;
    }
};
