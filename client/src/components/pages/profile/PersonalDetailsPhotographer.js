import React, {Component} from 'react';
import {Container, Grid, Card, Image, Tab, Input, Form, Button, Icon, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {saveProfile} from '../../../actions/profile';

class PersoanlDetailsPhotographer extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            location: {
                city: '',
                country: '',
            },
            details: {
                camera: '',
            }
        }
    }

    componentDidMount(){
        this.props.profile.isFetched && this.fillUserData(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.fillUserData(nextProps)
    }

    fillUserData(props){
        const profile = props.profile.data;
        props.profile.isFetched && this.setState({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            phone: profile.phone || '',
            email: profile.email || '',
            location: {
                city: profile.location.city || '',
                country: profile.location.country || '',
            },
            details: {
                camera: profile.details.camera || ''
            }
        });
    }

    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleLocationChange(e){
        let {location} = this.state;
        this.setState({
            location: {
                ...location,
                [e.target.name]: e.target.value
            }
        });
    }

    handleDetailsChange(e){
        let {details} = this.state;
        this.setState({
            details: {
                ...details,
                [e.target.name]: e.target.value
            }
        })
    }

    handleFormSubmit(){
        this.props.saveProfile(this.state);
    }

    render(){
        return (
            <Form onSubmit={this.handleFormSubmit.bind(this)}>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Form.Input
                                fluid
                                label='First Name'
                                name='firstName'
                                value={this.state.firstName}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                fluid
                                label='Last Name'
                                name='lastName'
                                value={this.state.lastName}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                fluid
                                label='Phone'
                                name='phone'
                                value={this.state.phone}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                fluid
                                label='Email'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                fluid
                                label='City'
                                name='city'
                                value={this.state.location.city}
                                onChange={this.handleLocationChange.bind(this)}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                fluid
                                label='Country'
                                name='country'
                                value={this.state.location.country}
                                onChange={this.handleLocationChange.bind(this)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Form.Input
                                fluid
                                label='Camera'
                                name='camera'
                                value={this.state.details.camera}
                                onChange={this.handleDetailsChange.bind(this)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button primary type='submit'>Save</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, {saveProfile})(PersoanlDetailsPhotographer);