import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    isFetched: false,
    data: null
}

function feedbacks(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.FETCH_FEEDBACKS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case ACTIONS.FETCH_FEEDBACKS_SUCCESS:
            return {
                isFetching: false,
                isFetched: true,
                data: action.payload
            }
        case ACTIONS.FETCH_FEEDBACKS_FAILURE:
            return {
                isFetching: false,
                isFetched: false,
                data: null
            }
        default: 
            return state
    }
}

export default feedbacks;