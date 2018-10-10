const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const multer = require('multer');
const sharp = require('sharp');
// const GoogleStorage = require('@google-cloud/storage');

// load models
const Photo = mongoose.model('Photo');
const User = mongoose.model('User');

// multer configs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/photos')
    },
    filename: function (req, file, cb) {
        // let extension = file.originalname.split('.').slice(-1)[0];
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({storage});



// // Initialize Google Storage
// const projectId = 'photo-models-ae577';
// const keyFilename = './config/gcloud-config.json';
// const bucketName = 'photo-models-ae577.appspot.com';

// const gogoleStorage = new GoogleStorage({
//     projectId,
//     keyFilename
// });
// const filename = './uploads/avatars/5abba914f8a0b650b0850295-avatar-250x250.png';

// // Uploads a local file to the bucket
// gogoleStorage
//     .bucket(bucketName)
//     .upload(filename)
//     .then(() => {
//         console.log(`${filename} uploaded to ${bucketName}.`);
//     })
//     .catch(err => {
//         console.error('ERROR:', err);
//     });



// upload new file
router.post('/photo', passport.authenticate('jwt', {session: false}), upload.array('photos'), (req, res) => {
    for (let file of req.files) {
        const destination = file.destination;
        const fileNameAray = file.filename.split('.');
        const filename = fileNameAray[0];
        const ext = fileNameAray[1];
        const filePath = file.path;

        sharp(filePath)
            .resize(300, null)
            .toFile(`${destination}/${filename}-300.${ext}`, function(err) {
                if (err) throw err;
            })
            .resize(300, 200)
            .toFile(`${destination}/${filename}-300x200.${ext}`, function(err) {
                if (err) throw err;
            })
            .resize(1800, null)
            .toFile(`${destination}/${filename}-1800.${ext}`, function(err) {
                if (err) throw err;
            })


        new Photo({
            url: file.filename,
            owner: req.user._id,
            comments: []
        }).save().then(photo => {
            res.send({message: 'photo uploaded successfully'});
        });
    }
    
});

router.delete('/photos/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // TODO: only owner can delete photo
    let id = req.params.id;
    User
        .findById(req.user._id)
        .then(foundUser => {
            let photoIndex = foundUser.photos.indexOf(id);
            foundUser.photos.splice(photoIndex, 1);
            foundUser.markModified('photos');
            foundUser
                .save()
                .then(() => {
                    Photo
                        .findByIdAndRemove(id)
                        .then(() => res.send({message: 'Photo was deleted successfully'}))
                });
        })
});

router.get('/photos/:userId', (req, res) => {
    let userId = req.params.userId;
    Photo
        .find({
            owner: userId
        })
        .select('url createdAt')
        .then(photos => {
            res.send(photos);
        })
});


module.exports = router;