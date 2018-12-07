import { combineReducers } from 'redux';

import { appReducer } from './app';
import { lobbylistReducer } from './lobbylist';
import { lobbyReducer } from './lobby';
import { userReducer } from './login';
import { chatReducer } from './chat';

const rootReducer = combineReducers({
    appReducer,
    lobbylistReducer,
    lobbyReducer,
    userReducer,
    chatReducer
});

export default rootReducer;
