import axios from 'axios';
import * as ACTIONS from './actionTypes';
import setAuthToken from '../helpers/setAuthToken';
import history from '../helpers/history';

// check if token is valid by requesting to private api route
export const validateToken = function(){
    return dispatch => {
        dispatch(request());
        return axios.get('/api/current_user')
            .then(res => {
                const user = res.data;
                dispatch(success(user));
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            })
            .catch(err => {
                dispatch(failure());
                dispatch(logout())
                throw err.response.data;
            })
    }

    function request(){
        return {
            type: ACTIONS.VALIDATE_TOKEN_REQUEST
        }
    }
    function success(user){
        return {
            type: ACTIONS.VALIDATE_TOKEN_SUCCESS,
            payload: user
        }
    }
    function failure(err){
        return {
            type: ACTIONS.VALIDATE_TOKEN_FAILURE
        }
    }
}

// set user details inside a store
export const authUser = function(user){
    return {
        type: ACTIONS.AUTH_USER,
        payload: user
    }
}

// Login action
export const login = function(data){
    return dispatch => {
        dispatch(request());
        return axios.post('/api/login', data)
            .then(res => {
                let {token, user} = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(success(res.data));
                setAuthToken(token);
                dispatch(authUser(res.data.user));
                return res.data;
            }).catch(err => {
                dispatch(success(err.response.data));
                throw err.response.data;
            })
    }

    function request(){
        return {
            type: ACTIONS.LOGIN_REQUEST
        }
    }
    function success(data){
        return {
            type: ACTIONS.LOGIN_SUCCESS,
            payload: data
        }
    }
    function failure(err){
        return {
            type: ACTIONS.LOGIN_SUCCESS,
            payload: err
        }
    }
}

// Register action
export const signup = function(data){
    return dispatch => {
        dispatch(request());
        return axios.post('/api/register', data)
            .then(res => {
                dispatch(success(res.data));
                return res.data;
            }).catch(err => {
                dispatch(success(err.response.data));
                throw err.response.data;
            })
    }

    function request(){
        return {
            type: ACTIONS.SIGNUP_REQUEST
        }
    }
    function success(data){
        return {
            type: ACTIONS.SIGNUP_SUCCESS,
            payload: data
        }
    }
    function failure(err){
        return {
            type: ACTIONS.SIGNUP_SUCCESS,
            payload: err
        }
    }
}

// Logout by removing all data related with user
export const unauthUser = function(){
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/');
        dispatch({
            type: ACTIONS.UNAUTH_USER
        })
    }
}
