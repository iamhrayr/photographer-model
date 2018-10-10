import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Button, Form, Grid, Header, Image, Message, Segment, Radio} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import history from '../../helpers/history';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            password: '',
            email: ''
        }
    }

    handleInputChange(e, {value, name}) {
        this.setState({[e.target.name]: e.target.value})
    };

    handleFormSubmit(){
        this.props.login(this.state)
            .then(res => {
                history.push('/profile')
            }).catch(err=> {
                
            })
    }

    render(){
        return (
            <Container text>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                    >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>Log-in to your account</Header>
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
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                <Button color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Fon't have an account? <Link to='/signup'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default connect(null, {login})(Login);