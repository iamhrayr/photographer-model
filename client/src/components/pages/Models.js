import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Card, Icon, Container, Loader, Segment, Dimmer} from 'semantic-ui-react';
import {fetchModels} from '../../actions/userActions';
import moment from 'moment';
import {Link} from 'react-router-dom';

class Models extends Component {
    componentDidMount(){
        this.props.fetchModels();
    }

    renderModelsList(){
        return this.props.models.data.map(model => {
            return (
                <Card key={model._id} as={Link} to={`model/${model._id}`}>
                    <Image src={`/uploads/avatars/${model.avatarImg}`} />
                    <Card.Content>
                        <Card.Header>
                            {`${model.firstName} ${model.lastName}`}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined: {moment(model.createdAt).format('MMMM Do YYYY') }</span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />    
                        22 Friends (dummy text)
                    </Card.Content>
                </Card>
            )
        })
    }

    render(){
        // show models list if conetnt was loaded
        if (this.props.models.isFetched) {
            return (
                <Container>
                    <Card.Group>
                        {this.renderModelsList()}
                    </Card.Group>
                </Container>
            )
        }

        // show loader if the content is loading
        return (
            <Container>
                <Segment style={{height: 200}}>
                    <Dimmer active inverted>
                        <Loader indeterminate>Loading</Loader>
                    </Dimmer>
                </Segment>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        models: state.models
    }
}

export default connect(mapStateToProps, {fetchModels})(Models);