import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    isFetched: false,
    data: null
}

function photographer(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.FETCH_PHOTOGRAPHER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case ACTIONS.FETCH_PHOTOGRAPHER_SUCCESS:
            return {
                isFetched: true,
                isFetching: false,
                data: action.payload
            }
        case ACTIONS.FETCH_PHOTOGRAPHER_FAILURE:
            return {
                isFetched: false,
                isFetching: false,
                data: null
            }
        default: 
            return state
    }
}

export default photographer;