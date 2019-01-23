import {
    ALL_ACTIVE_GAMES_REQUESTED,
    ALL_ACTIVE_GAMES_UPDATED,
    GAME_SELECT,
    CHAT_ADD,
    MESSAGES_LOAD,
    MESSAGE_ADD,
    FETCH_YELP_BUSINESSES_REQUESTED,
    FETCH_YELP_BUSINESSES_SUCCESS,
    FETCH_YELP_BUSINESSES_FAILURE,
    LOGIN_REQUESTED,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUESTED,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    TOKEN_LOGIN_REQUESTED,
    LOGOUT,
    CHAT_SELECT,
    ROUTE_CHANGE,
    CHAT_PROFILE_LOAD,
    TYPING_UPDATE,
    USER_HISTORY_LOAD,
    GAME_MESSAGES_LOAD,
    GAME_MESSAGE_ADD,
    GAME_TYPING_UPDATE,
    CHAT_USERS_ONLINE_UPDATE
} from './constants';

import { API_URL } from '../api-config';

/*  Game actions
*   
*/
export const getAllGames = () => {
    return dispatch => {
        dispatch({ type: ALL_ACTIVE_GAMES_REQUESTED });
    };
};

export const setAllGames = games => {
    return dispatch => {
        dispatch({ type: ALL_ACTIVE_GAMES_UPDATED, payload: games });
    };
};

export const changeRoute = route => {
    return dispatch => {
        dispatch({ type: ROUTE_CHANGE, payload: route });
    };
};

export const setGameHistory = gameHistory => {
    return dispatch => {
        dispatch({ type: USER_HISTORY_LOAD, payload: gameHistory });
    };
};

export const selectGame = gameId => {
    return dispatch => {
        dispatch({ type: GAME_SELECT, payload: gameId });
    };
};

/*  Chat actions
*   
*/
export const updateUsersOnline = usersOnline => {
    return dispatch => {
        dispatch({ type: CHAT_USERS_ONLINE_UPDATE, payload: usersOnline });
    };
};

export const selectChat = chatId => {
    return dispatch => {
        dispatch({ type: CHAT_SELECT, payload: chatId });
    };
};

export const loadChatProfile = profile => {
    return dispatch => {
        dispatch({ type: CHAT_PROFILE_LOAD, payload: profile });
    };
};

export const addChat = chat => {
    return dispatch => {
        dispatch({ type: CHAT_ADD, payload: chat });
    };
};

export const loadMessagesToChat = (chatId, prevMessages) => {
    return dispatch => {
        dispatch({
            type: MESSAGES_LOAD,
            payload: { chatId, prevMessages }
        });
    };
};

export const addMessageToChat = (chatId, newMessage) => {
    return dispatch => {
        dispatch({ type: MESSAGE_ADD, payload: { chatId, newMessage } });
    };
};

export const updateTypingInChat = (isTyping, username) => {
    return dispatch => {
        dispatch({ type: TYPING_UPDATE, payload: { isTyping, username } });
    };
};

/*  Game actions
*   
*/
export const loadMessagesToGame = prevMessages => {
    return dispatch => {
        dispatch({
            type: GAME_MESSAGES_LOAD,
            payload: prevMessages
        });
    };
};

export const addMessageToGame = newMessage => {
    return dispatch => {
        dispatch({ type: GAME_MESSAGE_ADD, payload: newMessage });
    };
};

export const updateTypingInGame = (isTyping, username) => {
    return dispatch => {
        dispatch({ type: GAME_TYPING_UPDATE, payload: { isTyping, username } });
    };
};

/*  Yelp actions
*   
*/
export const fetchYelpBusinesses = (searchTerm, location) => {
    return dispatch => {
        dispatch({ type: FETCH_YELP_BUSINESSES_REQUESTED });
        fetch(`${API_URL}/yelpbusinesssearch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                searchTerm: searchTerm,
                location: location
            })
        })
            .then(response => response.json())
            .then(yelpSearchResults => {
                dispatch({
                    type: FETCH_YELP_BUSINESSES_SUCCESS,
                    payload: yelpSearchResults
                });
            })
            .catch(error =>
                dispatch({
                    type: FETCH_YELP_BUSINESSES_FAILURE,
                    payload: error
                })
            );
    };
};

/*  Authentication actions
*   
*/
export const login = (username, password) => {
    return dispatch => {
        dispatch({ type: LOGIN_REQUESTED });
        return fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (!response.ok) throw Error(response.status);
                return response;
            })
            .then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                }
                dispatch({ type: LOGIN_SUCCESS, payload: response.user });
                return true;
            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILURE, payload: error });
                return false;
            });
    };
};

export const tokenLogin = token => {
    return dispatch => {
        dispatch({ type: TOKEN_LOGIN_REQUESTED });
        return fetch(`${API_URL}/tokenlogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token
            })
        })
            .then(response => {
                if (!response.ok) throw Error(response.status);
                return response;
            })
            .then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                }
                dispatch({ type: LOGIN_SUCCESS, payload: response.user });
                return true;
            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILURE, payload: error });
                return false;
            });
    };
};

export const signup = (
    firstName,
    lastName,
    city,
    state,
    username,
    email,
    passwordConfirm
) => {
    return dispatch => {
        dispatch({ type: SIGNUP_REQUESTED });
        return fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                city,
                state,
                username,
                email,
                passwordConfirm
            })
        })
            .then(response => {
                if (!response.ok) throw Error(response.status);
                dispatch({ type: SIGNUP_SUCCESS });
                return true;
            })
            .catch(error => {
                dispatch({ type: SIGNUP_FAILURE, payload: error });
                return false;
            });
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT });
    };
};
