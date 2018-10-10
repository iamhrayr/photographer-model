import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    isFetched: false,
    data: null
}

function photographers(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.FETCH_PHOTOGRAPHERS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case ACTIONS.FETCH_PHOTOGRAPHERS_SUCCESS:
            return {
                isFetched: true,
                isFetching: false,
                data: action.payload
            }
        case ACTIONS.FETCH_PHOTOGRAPHERS_FAILURE:
            return {
                isFetched: false,
                isFetching: false,
                data: null
            }
        default: 
            return state
    }
}

export default photographers;