import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    isFetched: false,
    data: null
}

function profile(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.FETCH_PROFILE_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case ACTIONS.FETCH_PROFILE_SUCCESS:
            return {
                isFetched: true,
                isFetching: false,
                data: action.payload
            }
        case ACTIONS.FETCH_PROFILE_FAILURE:
            return {
                isFetched: false,
                isFetching: false,
                data: null
            }
        default: 
            return state
    }
}

export default profile;