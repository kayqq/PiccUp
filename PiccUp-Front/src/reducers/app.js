import { ROUTE_CHANGE } from '../actions/constants';

const intitialState = {
    prevRoute: '',
    route: 'lobbylist'
};

export const appReducer = (state = intitialState, action = {}) => {
    switch (action.type) {
        case ROUTE_CHANGE:
            if (!action.payload) {
                return { ...state, prevRoute: '', route: state.prevRoute };
            }
            return { ...state, prevRoute: state.route, route: action.payload };
        default:
            return state;
    }
};
