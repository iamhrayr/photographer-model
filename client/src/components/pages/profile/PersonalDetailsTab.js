import React, {Component} from 'react';
import {Container, Grid, Card, Image, Tab, Input, Form, Button, Icon, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {saveProfile} from '../../../actions/profile';
import PersonalDetailsModel from './PersonalDetailsModel';
import PersonalDetailsPhotographer from './PersonalDetailsPhotographer';

class PersonalDetails extends Component {
    renderDetailsForm(){
        if (this.props.profile.data.kind === 'Model') {
            return <PersonalDetailsModel />;
        }
        return <PersonalDetailsPhotographer />;
    }

    render(){
        return (
            <Tab.Pane>
                {this.props.profile.data && this.renderDetailsForm.call(this)}
            </Tab.Pane>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, {saveProfile})(PersonalDetails);