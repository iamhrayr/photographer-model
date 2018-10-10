import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    isFetched: false,
    data: null
}

function comments(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case ACTIONS.FETCH_COMMENTS_SUCCESS:
            return {
                isFetching: false,
                isFetched: true,
                data: action.payload
            }
        case ACTIONS.FETCH_COMMENTS_FAILURE:
            return {
                isFetching: false,
                isFetched: false,
                data: null
            }
        default: 
            return state
    }
}

export default comments;