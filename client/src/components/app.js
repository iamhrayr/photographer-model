import React, {Component} from "react";
import {Router, Route, Link} from 'react-router-dom';
import {PrivateRoute, GuestRoute} from '../helpers/RouterHelpers';
import {connect} from 'react-redux';
import {validateToken, authUser, logout} from '../actions/auth'
import {fetchProfile} from '../actions/profile'
import history from '../helpers/history';
import Navbar from './Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/profile';
import Models from './pages/Models';
import Photographers from './pages/Photographers';
import PublicProfileModel from './pages/PublicProfileModel';

class App extends Component {

    componentWillMount(){
        if (localStorage.token) {
            localStorage.user && this.props.authUser(JSON.parse(localStorage.user));
            this.props.validateToken();
            this.props.fetchProfile();
        }
    }

    render(){
        return (
            <Router history={history}>
                <React.Fragment>

                    <Navbar />
                    
                    <Route exact path="/" component={Home} />
                    <Route exact path="/models" component={Models} />
                    <Route exact path="/model/:id" component={PublicProfileModel} />
                    <Route exact path="/photographers" component={Photographers} />
                    {/* <Route exact path="/photographer" component={Photographer} /> */}
                    <GuestRoute path="/login" component={Login} />
                    <GuestRoute path="/signup" component={Signup} />
                    <PrivateRoute path="/profile" component={Profile} />

                </React.Fragment>
            </Router>
        );
    }
};

export default connect(null, {validateToken, authUser, logout, fetchProfile})(App);