import React, {Component} from 'react';
import {Container, Button, Form, List, Image, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchConversations, fetchMessages} from '../../../actions/messages';
import getResizedPhoto from '../../../helpers/getResizedPhoto';

class Messages extends Component {

    componentDidMount(){
        this.props.fetchConversations();
    }

    rednerConversationsList(){
        return this.props.conversations.data.map(conv => {
            return (
                <List.Item key={conv._id} onClick={() => this.props.fetchMessages(conv._id)}>
                    <Image avatar src={`/uploads/avatars/${getResizedPhoto(this.props.profile.data.avatarImg,'100x100')}`} />
                    <List.Content as={Link} to={`/profile/messages/${conv._id}`}>
                        <List.Header>{conv.participants[0].firstName}</List.Header>
                    </List.Content>
                </List.Item>
            );
        });
    }

    renderMessages(){
        return this.props.messages.data.map(message => {
            return (
                <List.Item key={message._id}>
                    <List.Content>
                        <List.Description>{message.body}</List.Description>
                    </List.Content>
                </List.Item>
            );
        })
    }

    render(){
        if (!this.props.conversations.data) {
            return <span>Loading...</span>
        }
        console.log(this.props.messages)

        return (
            <Container>
                <Grid padded>
                    <Grid.Column width={4}>
                        <List divided verticalAlign='middle'>
                            {this.rednerConversationsList()}
                        </List>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <List divided verticalAlign='middle'>
                            {/* {this.props.messages.data && this.renderMessages()} */}
                        </List>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        conversations: state.conversations,
        profile: state.profile,
        messages: state.messages
    }
}

export default connect(mapStateToProps, {fetchConversations, fetchMessages})(Messages);