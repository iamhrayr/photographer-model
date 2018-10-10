import axios from 'axios';
import * as ACTIONS from './actionTypes';
import _ from 'lodash';

// fetch model profile
export const fetchModel = function(id){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/models/${id}`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_MODEL_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.FETCH_MODEL_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_MODEL_FAILURE,
            payload: err
        }
    }
}


// fetch photographer profile
export const fetchPhotographer = function(id){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/photographers/${id}`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_PHOTOGRAPHER_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.FETCH_PHOTOGRAPHER_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_PHOTOGRAPHER_FAILURE,
            payload: err
        }
    }
}


// fetch models list
export const fetchModels = function(){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/models`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_MODELS_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.FETCH_MODELS_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_MODELS_FAILURE,
            payload: err
        }
    }
}


// fetch photographer list
export const fetchPhotographers = function(){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/photographers`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_PHOTOGRAPHERS_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.FETCH_PHOTOGRAPHERS_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_PHOTOGRAPHERS_FAILURE,
            payload: err
        }
    }
}


// send messages
export const sendMessage = function(userId, msg){
    return dispatch => {
        dispatch(request());
        axios.post(`/api/message/${userId}`, {msgBody: msg})
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.SEND_MESSAGE_REQUEST
        }
    }
    function success(res){
        return {
            type: ACTIONS.SEND_MESSAGE_SUCCESS,
            payload: res
        }
    }
    function failure(err){
        return {
            type: ACTIONS.SEND_MESSAGE_FAILURE,
            payload: err
        }
    }
}

// Leave Feedback
export const leaveFeedback = function(userId, feedback){
    return dispatch => {
        dispatch(request());
        return axios.post(`/api/feedback/${userId}`, feedback)
            .then(res => {
                dispatch(success(res.data));
                return Promise.resolve(res.data);
            })
            .catch(err => {
                dispatch(failure(err.response.data));
                return Promise.reject(err.response.data);
            })
    }

    function request(){
        return {
            type: ACTIONS.LEAVE_FEEDBACK_REQUEST
        }
    }
    function success(res){
        return {
            type: ACTIONS.LEAVE_FEEDBACK_SUCCESS,
            payload: res
        }
    }
    function failure(err){
        return {
            type: ACTIONS.LEAVE_FEEDBACK_FAILURE,
            payload: err
        }
    }
}