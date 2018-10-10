import React, {Component} from 'react';
import {Container, Button, Form, Grid, Header, Image, Message, Segment, Radio} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signup} from '../../actions/auth';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            userType: 'model',
            password: '',
            confirmPassword: '',
            email: ''
        }
    }
    
    handleRadioChange(e, {value, name}) {
        this.setState({[name]: value});
    };

    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit(){
        this.props.signup(this.state)
            .then(res => {
                console.log('registered', res)
            })
            .catch(err => {
                console.log('error', err)
            });
    }

    render(){
        return (
            <Container text>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                    >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>Sign up</Header>
                        <Form size='large' onSubmit={this.handleFormSubmit.bind(this)}>
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    name='email'
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='First Name'
                                    name='firstName'
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Last Name'
                                    name='lastName'
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    type='password'
                                    name='confirmPassword'
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                <Form.Group>
                                    <Form.Field>
                                        <Radio
                                            label='Model'
                                            name='userType'
                                            value='model'
                                            checked={this.state.userType === 'model'}
                                            onChange={this.handleRadioChange.bind(this)}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio
                                            label='Photographer'
                                            name='userType'
                                            value='photographer'
                                            checked={this.state.userType === 'photographer'}
                                            onChange={this.handleRadioChange.bind(this)}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Button color='teal' fluid size='large'>Signup</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already a member? <Link to='/login'>Login</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default connect(null, {signup})(Login);