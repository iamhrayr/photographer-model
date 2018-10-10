import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    isFetched: false,
    data: null
}

function photo(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.FETCH_GALLERY_PHOTO_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case ACTIONS.FETCH_GALLERY_PHOTO_SUCCESS:
            return {
                isFetching: false,
                isFetched: true,
                data: action.payload
            }
        case ACTIONS.FETCH_GALLERY_PHOTO_FAILURE:
            return {
                isFetching: false,
                isFetched: false,
                data: null
            }
        default: 
            return state
    }
}

export default photo;