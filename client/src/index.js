import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import {Provider} from 'react-redux';
import store from './helpers/store';
import setAuthToken from './helpers/setAuthToken';
import './public/main.scss';

// set auth token inside all requests if it exists in localstorage
setAuthToken(localStorage.token);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("app")
);