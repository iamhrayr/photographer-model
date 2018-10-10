const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const base64Img = require('base64-img');
const mime = require('mime-types')
const multer = require('multer');
const sharp = require('sharp');
const secret = require('../config/keys').secret;

// Load models
const User = mongoose.model('User');
const Model = mongoose.model('Model');
const Photographer = mongoose.model('Photographer');

// configure file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/avatars')
    },
    filename: function (req, file, cb) {
        let ext = mime.extension(file.mimetype)
        cb(null, `${req.user._id}-avatar.${ext}`);
    }
})
const upload = multer({storage});


router.post('/register', (req, res) => {
    // check if user does not exists
    User
        .findOne({email: req.body.email})
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send({message: 'The user with the email is already exists'});
            } else {
                // Create a user if it does not exists
                const newUser = req.body;
                switch (req.body.userType) {
                    case 'model':
                        new Model(newUser).save().then(() => {
                            res.send({message: 'You have successfully registered'})
                        });
                        break;
                    case 'photographer':
                        new Photographer(newUser).save().then(() => {
                            res.send({message: 'You have successfully registered'})
                        });
                        break;
                }
            }
        })
});

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User
        .findOne({email})
        .then(user => {
            if (!user) {
                return res.status(400).send({message: 'Wrong credentials'});
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const payload = {
                        _id: user._id,
                        email: user.email
                    };
                    const token = jwt.sign(payload, secret);
                    const userData = {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        kind: user.kind,
                        _id: user._id
                    }
                    const dataToBeSent = {
                        user: userData,
                        token
                    };
                    return res.send(dataToBeSent);
                } else {
                    return res.status(400).send({message: 'Wrong credentials'});
                }
            })
        })
    
});

router.get('/current_user', passport.authenticate('jwt', {session:false}), (req, res) => {
    const userData = {
        _id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        kind: req.user.kind
    }
    res.send(userData);
})

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    // let userId = req.params.userId;
    let userId = req.user._id;
    User
        .findOne({_id: userId})
        .select('-password')
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.patch('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    let userId = req.user._id;
    let data = req.body;
    User
        .findOne({_id: userId})
        .then(user => {
            user = Object.assign(user, data);
            user.save().then(() => {
                res.send({message: 'Profile saved successfully.'});
            }).catch(err => {
                res.status(400).send(err);
            })
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// upload new file
router.post('/profile/avatar', passport.authenticate('jwt', {session: false}), upload.single('avatar'), (req, res) => {
    const userId = req.user._id;

    const filePath = req.file.path;
    const destination = req.file.destination;
    const fileNameAray = req.file.filename.split('.');
    const filename = fileNameAray[0];
    const ext = fileNameAray[1];

    sharp(filePath)
        .resize(100, null)
        .toFile(`${destination}/${filename}-100x100.${ext}`, function(err) {
            if (err) throw err;
        })
        .resize(250, null)
        .toFile(`${destination}/${filename}-250x250.${ext}`, function(err) {
            if (err) throw err;
        })
        .resize(500, null)
        .toFile(`${destination}/${filename}-500x500.${ext}`, function(err) {
            if (err) throw err;
        })
        .resize(1200, null)
        .toFile(`${destination}/${filename}-1200x1200.${ext}`, function(err) {
            if (err) throw err;
        });
        

    User
        .findOne({_id: userId})
        .then(user => {
            user.avatarImg = req.file.filename;
            user.save().then(() => {
                res.send({message: 'Avatar updated successfully'});
            }).catch(err => {
                res.status(422).send(err);
            })
        });
});



module.exports = router;
