import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Card, Icon, Container, Loader, Segment, Dimmer} from 'semantic-ui-react';
import {fetchPhotographers} from '../../actions/userActions';
import moment from 'moment';
import {Link} from 'react-router-dom';

class Photographers extends Component {
    componentDidMount(){
        this.props.fetchPhotographers();
    }

    renderModelsList(){
        return this.props.photographers.data.map(photographer => {
            return (
                <Card key={photographer._id} as={Link} to={`photographers/${photographer._id}`}>
                    <Image src={`/uploads/avatars/${photographer.avatarImg}`} />
                    <Card.Content>
                        <Card.Header>
                            {`${photographer.firstName} ${photographer.lastName}`}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined: {moment(photographer.createdAt).format('MMMM Do YYYY') }</span>
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
        if (this.props.photographers.isFetched) {
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
        photographers: state.photographers
    }
}

export default connect(mapStateToProps, {fetchPhotographers})(Photographers);