import React, {Component} from 'react';
import {Container, Grid, Card, Image, Tab, Input, Form, Button, Icon, Label, Modal, Menu} from 'semantic-ui-react';
import PersonalDetailsTab from './PersonalDetailsTab';
import GalleryTab from './GalleryTab';
import SettingsTab from './SettingsTab';
import Messages from './Messages';
import AddGallery from './AddGallery';
import b64toBlob from '../../../helpers/b64toBlob';
import getResizedPhoto from '../../../helpers/getResizedPhoto';
import {Cropper} from 'react-image-cropper';
import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import history from '../../../helpers/history';
import {uploadAvatar, fetchProfile} from '../../../actions/profile';
import Img from 'react-image';



class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            isCropModalOpen: false,
            avatarNewUploaded: '',
            avatarCropped: '',
            avatarImg: '',
            activeTab: ''
        }
    }

    handleAvatarChange(e){
        const reader = new FileReader();

        reader.onload = () => {
            let result = reader.result;
            this.setState({
                avatarNewUploaded: result,
                isCropModalOpen: true
            });
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    uploadAvatar(base64src){
        var blob = b64toBlob(base64src);
        var formData = new FormData();
        formData.append("avatar", blob);
        this.props.uploadAvatar(formData);
    }

    handleImageCrop(){
        const base64src = this.cropper.crop();
        this.setState({
            avatarCropped: base64src,
            isCropModalOpen: false
        });

        this.uploadAvatar(base64src);
    }

    openCropModal(){ 
        this.setState({isCropModalOpen: true})
    }

    closeCropModal(){ 
        this.setState({isCropModalOpen: false})
    }

    handleTabClick(e, {name}){
        this.setState({activeTab: name})
    }

    render(){
        const { isCropModalOpen, avatarCropped } = this.state;
        const url = avatarCropped 
            ? avatarCropped 
            : this.props.profile.data
                ? `/uploads/avatars/${getResizedPhoto(this.props.profile.data.avatarImg, '250x250')}`
                : `/uploads/avatars/no-image.png`;

        return (
            <Container>
                <Grid>
                    <Grid.Column width={4}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    {/* <Image src={url} /> */}
                                    <Img 
                                        src={url}
                                        loader={<span>Loading...</span>}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <label className="ui icon basic button" style={{width:'100%'}}>
                                        <Icon name='image' /> Change Image
                                        <Input type="file" style={{display:'none'}} onChange={this.handleAvatarChange.bind(this)}/>
                                    </label>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    {this.props.profile.data && <Label>{this.props.profile.data.kind}</Label>}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        
                        {/* image cropper modal */}
                        <Modal size='small' open={isCropModalOpen} onClose={this.closeCropModal.bind(this)}>
                            <Modal.Content>
                                <Cropper 
                                    ratio={1/1}
                                    width={300}
                                    originX={100}
                                    originY={100}
                                    allowNewSelection={false}
                                    src={this.state.avatarNewUploaded}
                                    ref={ref => {this.cropper = ref}}
                                />
                                <Button onClick={this.handleImageCrop.bind(this)}>Crop &amp; Save</Button>
                                <p color='red'>* The image will be automatically saved after pressing "Crop &amp; Save"</p>
                            </Modal.Content>
                        </Modal>
                            
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Menu pointing secondary>
                            <Menu.Item 
                                name='Personal Details' 
                                as={Link} 
                                to='/profile/details' 
                                active={this.state.activeTab === 'Personal Details'} 
                                onClick={this.handleTabClick.bind(this)}
                            />
                            <Menu.Item 
                                name='Gallery' 
                                as={Link} 
                                to='/profile/gallery' 
                                active={this.state.activeTab === 'Gallery'} 
                                onClick={this.handleTabClick.bind(this)}
                            />
                            <Menu.Item 
                                name='Messages' 
                                as={Link} 
                                to='/profile/messages' 
                                active={this.state.activeTab === 'Messages'} 
                                onClick={this.handleTabClick.bind(this)}
                            />
                        </Menu>
                        <React.Fragment>
                            <Route path='/profile/' exact component={PersonalDetailsTab} />
                            <Route path='/profile/details' component={PersonalDetailsTab} />
                            <Route path='/profile/gallery' component={GalleryTab} />
                            <Route path='/profile/settings' component={SettingsTab} />
                            <Route path='/profile/add-gallery' component={AddGallery} />
                            <Route path='/profile/messages' component={Messages} />
                        </React.Fragment>
                        {/* <Tab panes={panes} menu={{ secondary: true, pointing: true }} /> */}
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, {uploadAvatar, fetchProfile})(Profile);

