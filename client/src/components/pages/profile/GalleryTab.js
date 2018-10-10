import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Grid, Card, Image, Tab, Input, Form, Button, Icon, Label, Modal, Loader, Segment } from 'semantic-ui-react';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import shortid from 'shortid';
import {Link} from 'react-router-dom';
import getResizedPhoto from '../../../helpers/getResizedPhoto';
import {fetchGallery, deletePhoto} from '../../../actions/gallery';
// import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image';
import LazyLoad from 'react-lazy-load';
// import InfiniteScroll from 'react-infinite-scroll-component';

import imgPlaceholder from '../../../public/img/300x200.png';


class GalleryTab extends Component {

    componentDidMount(){
        this.props.fetchGallery(this.props.user._id);
    }

    handlePhotoDelete(id){
        this.props.deletePhoto(id)
    }

    renderPhotos(){
        return this.props.gallery.data ? this.props.gallery.data.map(photo => {
            let thumbnail = getResizedPhoto(photo.url, '300x200');
            // let thumbnail = getResizedPhoto(photo.url, '1800');

            return (
                <Grid.Column key={photo._id}>
                    <Card>
                        <div className='img-wrapper'>
                            <LazyLoad offsetVertical={200}>
                                <Image 
                                    src={`/uploads/photos/${thumbnail}`} 
                                    loader={ <Img src={imgPlaceholder} style={{width:'100%'}}/> } 
                                    style={{width:'100%'}}
                                />
                            </LazyLoad>
                        </div>
                        <Card.Content>
                            <Card.Meta>
                                <span className='date'>
                                    {moment(photo.createdAt).format('MMMM Do YY')}
                                </span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon style={{cursor: 'pointer'}} name='trash outline' color='red' size='large' onClick={() => this.handlePhotoDelete.call(this, photo._id)}/>
                            <Label>
                                <Icon name='eye' /> 23
                            </Label>
                            <Label>
                                <Icon name='comments' /> 23
                            </Label>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            )
        }) : '';
    }

    render(){
        return (
            <Tab.Pane>
                <div style={{textAlign:'center', marginBottom: 15}}>
                    <Button to='/profile/add-gallery' as={Link} primary>Add Photo</Button>
                </div>
               
                <React.Fragment>
                    <Loader active={this.props.gallery.isFetching ? true : false}/>
                    {this.props.gallery.data && <Grid columns={3}>
                        {this.renderPhotos.call(this)}
                    </Grid>}
                </React.Fragment>
            </Tab.Pane>
        );
    }
}

function mapStateToProps(state) {
    return {
        gallery: state.gallery,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {fetchGallery, deletePhoto})(GalleryTab);