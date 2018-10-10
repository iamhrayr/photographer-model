import * as ACTIONS from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    isFetched: false,
    data: null
}

function gallery(state=defaultState, action){
    switch (action.type) {
        case ACTIONS.FETCH_GALLERY_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case ACTIONS.FETCH_GALLERY_SUCCESS:
            return {
                isFetching: false,
                isFetched: true,
                data: action.payload
            }
        case ACTIONS.FETCH_GALLERY_FAILURE:
            return {
                isFetching: false,
                isFetched: false,
                data: null
            }
        case ACTIONS.DELETE_GALLERY_PHOTO_SUCCESS:
            return {
                isFetching: false,
                isFetched: true,
                data: state.data.filter(elem => {
                    return elem._id !== action.photoId
                })
            }
        default: 
            return state
    }
}

export default gallery;