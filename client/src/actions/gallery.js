import axios from 'axios';
import * as ACTIONS from './actionTypes';
import _ from 'lodash';

// add photo
export const addPhoto = function(formData){
    return dispatch => {
        dispatch(request());
        return axios.post('/api/photo', formData)
            .then(res => {
                dispatch(success(res.data));
                return res.data;
            })
            .catch(err => {
                dispatch(failure(err.response.data));
                throw err.response.data;
            })
    }

    function request(){
        return {
            type: ACTIONS.SAVE_GALLERY_PHOTO_REQUEST
        }
    }
    function success(photo){
        return {
            type: ACTIONS.SAVE_GALLERY_PHOTO_SUCCESS,
            payload: photo
        }
    }
    function failure(err){
        return {
            type: ACTIONS.SAVE_GALLERY_PHOTO_FAILURE,
            payload: err
        }
    }
}

// fetch user gallery photos
export const fetchGallery = function(userId){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/photos/${userId}`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_GALLERY_REQUEST
        }
    }
    function success(photo){
        return {
            type: ACTIONS.FETCH_GALLERY_SUCCESS,
            payload: photo
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_GALLERY_FAILURE,
            payload: err
        }
    }
}



// delete single photo by id
export const deletePhoto = function(photoId){
    return dispatch => {
        dispatch(request());
        axios.delete(`/api/photos/${photoId}`)
            .then(res => {
                dispatch(success(res.data, photoId));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.DELETE_GALLERY_PHOTO_REQUEST
        }
    }
    function success(res, photoId){
        return {
            type: ACTIONS.DELETE_GALLERY_PHOTO_SUCCESS,
            photoId,
            payload: res
        }
    }
    function failure(err){
        return {
            type: ACTIONS.DELETE_GALLERY_PHOTO_FAILURE,
            payload: err
        }
    }
}





