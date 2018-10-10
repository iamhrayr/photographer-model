import axios from 'axios';
import * as ACTIONS from './actionTypes';
import _ from 'lodash';

// fetch conversations
export const fetchConversations = function(){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/conversations`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_CONVERSATIONS_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.FETCH_CONVERSATIONS_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_CONVERSATIONS_FAILURE,
            payload: err
        }
    }
}

// fetch conversation
export const fetchMessages = function(id){
    return dispatch => {
        dispatch(request());
        axios.get(`/api/conversation/${id}`)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(failure(err.response.data));
            })
    }

    function request(){
        return {
            type: ACTIONS.FETCH_MESSAGES_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.FETCH_MESSAGES_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.FETCH_MESSAGES_FAILURE,
            payload: err
        }
    }
}