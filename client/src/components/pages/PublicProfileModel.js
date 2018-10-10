import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Grid, List, Label, Image, Card, Icon, Container, Loader, Segment, Dimmer, Button, Rating, Modal, Form} from 'semantic-ui-react';
import _ from 'lodash';
import {fetchModel, fetchPhotographer, sendMessage, leaveFeedback} from '../../actions/userActions';
import {fetchGallery} from '../../actions/gallery';
import getResizedPhoto from '../../helpers/getResizedPhoto';

class PublicProfileModel extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            feedback: '',
            rating: 0
        }
    }

    componentDidMount(){
        const modelId = this.props.match.params.id;
        this.props.fetchModel(modelId);
        this.props.fetchGallery(modelId);
    }

    renderModelDetails(details){
        return _.map(details, (value, key) => {
            return (
                <List.Item key={key}>
                    <Label horizontal>{key}</Label>
                    {value}
                </List.Item>
            )
        })
    }

    handleMessageSubmit(){
        let userId = this.props.match.params.id;
        this.props.sendMessage(userId, this.state.message)
            .then(() => {
                this.setState({
                    message: ''
                })
            });
    }

    handleRateChange(e, data){
        console.log(data)
        this.setState({
            rating: data.rating
        })
    }

    handleFeedbackSubmit(){
        let userId = this.props.match.params.id;
        let feedback = {
            text: this.state.feedback,
            rating: this.state.rating
        }
        this.props.leaveFeedback(userId, feedback)
            .then(() => {
                this.setState({
                    feedback: '',
                    rating: 0
                });
            });
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    renderPhotos(){
        return this.props.gallery.data.map(photo => {
            let url = '/uploads/photos/' + getResizedPhoto(photo.url, '300x200');
            return <Image key={photo._id} src={url} style={{margin: 5}}/>;
        })
    }

    render(){
        // show model's details if conetnt was loaded
        const model = this.props.model;
        if (model.isFetched) {
            return (
                <Container>
                    <Grid>
                        <Grid.Column width={4}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Image src={`/uploads/avatars/${model.data.avatarImg}`}/>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        {<Label>{model.data.kind}</Label>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <List divided>
                                            {this.renderModelDetails(model.data.details)}
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <h2>
                                            {`${model.data.firstName} ${model.data.lastName}`}
                                            <Rating maxRating={5} rating={3} icon='star' size='large' disabled style={{marginLeft: 10}}/>
                                        </h2>
                                        <div>
                                            <Modal trigger={<Button primary>Send Message</Button>}>
                                                <Modal.Header>Send message to {model.data.firstName}</Modal.Header>
                                                <Modal.Content>
                                                    <Form onSubmit={this.handleMessageSubmit.bind(this)}>
                                                        <textarea style={{marginBottom: 10}} value={this.state.message} name='message' onChange={this.handleInputChange.bind(this)}></textarea>
                                                        <Button primary basic>Send</Button>
                                                    </Form>
                                                </Modal.Content>
                                            </Modal>
                                            <Modal trigger={<Button basic primary>Leave a feedback</Button>}>
                                                <Modal.Header>Send message to {model.data.firstName}</Modal.Header>
                                                <Modal.Content>
                                                    <Form onSubmit={this.handleFeedbackSubmit.bind(this)}>
                                                        <textarea style={{marginBottom: 10}} value={this.state.feedback} name='feedback' onChange={this.handleInputChange.bind(this)}></textarea>
                                                        <Rating maxRating={5} rating={this.state.rating} clearable onRate={this.handleRateChange.bind(this)}/>
                                                        <Button primary basic>Send</Button>
                                                    </Form>
                                                </Modal.Content>
                                            </Modal>
                                            
                                            <Button as='div' labelPosition='right'>
                                                <Button icon>
                                                    <Icon name='heart' />
                                                    Like
                                                </Button>
                                                <Label basic pointing='left'>2,048</Label>
                                            </Button>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    {this.props.gallery.isFetched && this.renderPhotos()}
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
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
        model: state.model,
        gallery: state.gallery
    }
}

export default connect(mapStateToProps, {fetchModel, fetchPhotographer, fetchGallery, sendMessage, leaveFeedback})(PublicProfileModel);