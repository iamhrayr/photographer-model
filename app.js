const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/keys');
const passport = require('passport');
const morgan = require('morgan');

// init express app
const app = express();

app.use(morgan('tiny'));

// connect to the MongoDB
mongoose.connect(config.mongodbURI, () => {
    console.log('connected to the mongodb');
});

// Load models
require('./models/Feedback');
require('./models/User');
require('./models/Message');
require('./models/Photo');
require('./models/Comment');
// require('./models/Comment');

// Load routes
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const messageRoutes = require('./routes/message');
const photoRoutes = require('./routes/photo');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

// load passport config file
require('./config/passport')(passport);

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());


// Execute routes
app.use('/api', authRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', messageRoutes);
app.use('/api', photoRoutes);
app.use('/api', commentRoutes);
app.use('/api', userRoutes);

// send index.html when trying to load a page of application
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/', express.static(path.join(__dirname, '/client/dist')))
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});



// Listen to the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('server started on the port:', PORT);
});
