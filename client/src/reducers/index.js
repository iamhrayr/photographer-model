import {combineReducers} from "redux";
import auth from './auth';
import comments from './comments';
import conversations from './conversations';
import feedbacks from './feedbacks';
import gallery from './gallery';
import messages from './messages';
import photo from './photo';
import profile from './profile';
import models from './models';
import model from './model';
import photographers from './photographers';
import photographer from './photographer';

export default combineReducers({
    auth,
    comments,
    conversations,
    feedbacks,
    gallery,
    messages,
    photo,
    profile,
    models,
    model,
    photographers,
    photographer
});