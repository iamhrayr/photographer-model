import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Grid, Card, Image, Tab, Input, Form, Button, Icon, Label, Divider} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import shortid from 'shortid';
import {addPhoto} from '../../../actions/gallery';
import history from '../../../helpers/history';

class AddGallery extends Component {

    constructor(props){
        super(props);
        this.state = {
            droppedFiles: []
        }
    }

    onDrop(files){
        this.setState({
            droppedFiles: [
                ...this.state.droppedFiles,
                ...files
            ]
        })
    }

    removePhoto(index){
        let copy = Object.assign([], this.state.droppedFiles);
        copy.splice(index, 1);
        this.setState({
            droppedFiles: copy
        })
    }

    uploadPhotos(){
        let formData = new FormData();
        for (let file of this.state.droppedFiles) {
            formData.append('photos', file);
        }
        this.props.addPhoto(formData)
            .then(res => {
                history.push('/profile/gallery')
            });
    }

    renderDroppedImages(){
        if (this.state.droppedFiles.length > 0) {
            return (
                <div className='preview-wrapper'>
                    {this.state.droppedFiles.map((file, i) => {
                        let styles = {backgroundImage: `url(${file.preview})`}
                        return (
                            <div key={shortid.generate()} className='drop-image-single'>
                                <div className='drop-image-preview' style={styles}/>
                                <p className='text-ellipsis'>{file.name}</p>
                                <span>~ {_.round(file.size/(1024*1024),2)} Mb</span>
                                <Button icon='trash outline' color='red' onClick={() => this.removePhoto.call(this, i)}></Button>
                            </div>
                        )
                    })}
                </div>
            );
        }
    }

    render(){
        return (
            <React.Fragment>
                <Dropzone 
                    onDrop={this.onDrop.bind(this)} 
                    className='drop-zone'
                    activeClassName='drop-zone-active'
                    rejectClassName='drop-zone-reject'
                >
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
                {this.renderDroppedImages.call(this)}
                <Divider />
                <Button onClick={this.uploadPhotos.bind(this)} primary>Save</Button>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, {addPhoto})(AddGallery);