import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isAuthenticated: false,
    user: null
}

function auth(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.VALIDATE_TOKEN_SUCCESS:
        case ACTIONS.AUTH_USER:
            return {
                isAuthenticated: true,
                user: action.payload
            }
        case ACTIONS.UNAUTH_USER:
            return {
                isAuthenticated: false,
                user: null
            }
        default: 
            return state
    }
}

export default auth;