import React, { Component } from 'react';
import {Menu, Dropdown, Button, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import getResizedPhoto from '../helpers/getResizedPhoto'
import {unauthUser} from '../actions/auth';

class Header extends Component {
    constructor(){
        super();
        this.state = {
            activeItem: ''
        }
    }

    handleLogout(){
        this.props.unauthUser();
    }
  
    render() {
        const {activeItem} = this.state
        const {isAuthenticated} = this.props.auth;
        return (
            <Menu>
                <Menu.Item
                    name='home'
                    as={Link}
                    to='/'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    Home
                </Menu.Item>
                <Menu.Item
                    name='models'
                    as={Link}
                    to='/models'
                    active={activeItem === 'models'}
                    onClick={this.handleItemClick}
                >
                    Modles
                </Menu.Item>
                <Menu.Item
                    name='photographers'
                    as={Link}
                    to='/photographers'
                    active={activeItem === 'photographers'}
                    onClick={this.handleItemClick}
                >
                    Photographers
                </Menu.Item>

                {!isAuthenticated && <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        as={Link}
                        to='/login'
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    >
                        Login
                    </Menu.Item>
                    <Menu.Item
                        name='signup'
                        as={Link}
                        to='/signup'
                        active={activeItem === 'signup'}
                        onClick={this.handleItemClick}
                    >
                        Signup
                    </Menu.Item>
                </Menu.Menu>}

                {isAuthenticated && this.props.profile.data && <Menu.Menu position='right'>
                    <Dropdown 
                        item 
                        trigger={
                            <span>
                                <img src={this.props.profile.data && this.props.profile.data.avatarImg && `/uploads/avatars/${getResizedPhoto(this.props.profile.data.avatarImg, '100x100')}`} style={{width: 30, borderRadius: 100, verticalAlign: 'middle', marginRight: 10}}/>
                                <span style={{verticalAlign: 'middle'}}>{`${this.props.profile.data.firstName} ${this.props.profile.data.lastName}`}</span>
                            </span>
                        }
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/messages'>Messages</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={this.handleLogout.bind(this)}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>}
            </Menu>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth,
        profile: state.profile
    }
}

export default connect(mapStateToProps, {unauthUser})(Header);
