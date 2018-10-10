import axios from 'axios';
import * as ACTIONS from './actionTypes';
import _ from 'lodash';

// get profile
export const fetchProfile = function(){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/profile`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_PROFILE_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.FETCH_PROFILE_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_PROFILE_FAILURE,
            payload: err
        }
    }
}

// save profile
export const saveProfile = function(data){
    return dispatch => {
        dispatch(request());
        // clean incoming data from epty strings
        let cleanData = _.pickBy(data);
        axios.patch('/api/profile', cleanData)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.SAVE_PROFILE_REQUEST
        }
    }
    function success(res){
        return {
            type: ACTIONS.SAVE_PROFILE_SUCCESS,
            payload: res
        }
    }
    function failure(err){
        return {
            type: ACTIONS.SAVE_PROFILE_FAILURE,
            payload: err
        }
    }
}

// upload avatar
export const uploadAvatar = function(formData){
    return dispatch => {
        dispatch(request());
        // clean incoming data from epty strings
        axios.post('/api/profile/avatar', formData)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.SAVE_PROFILE_AVATAR_REQUEST
        }
    }
    function success(res){
        return {
            type: ACTIONS.SAVE_PROFILE_AVATAR_SUCCESS,
            payload: res
        }
    }
    function failure(err){
        return {
            type: ACTIONS.SAVE_PROFILE_AVATAR_FAILURE,
            payload: err
        }
    }
}