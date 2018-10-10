const mongoose = require('mongoose');
const router = require('express').Router();

// load models
const Model = mongoose.model('Model');
const Photographer = mongoose.model('Photographer');

router.get('/models/:id', (req, res) => {
    let modelId = req.params.id;
    Model
        .findOne({_id: modelId})
        .select('-password -__v')
        .then(mdoel => {
            res.send(mdoel);
        })
        .catch(err => {
            res.status(422).send(err);
        });
});

router.get('/models', (req, res) => {
    Model
        .find({})
        .select('-password -__v')
        .then(mdoel => {
            res.send(mdoel);
        })
        .catch(err => {
            res.status(422).send(err);
        });
});

router.get('/photographers/:id', (req, res) => {
    let modelId = req.params.id;
    Photographer
        .findOne({_id: modelId})
        .select('-password -__v')
        .then(photographer => {
            res.send(photographer);
        })
        .catch(err => {
            res.status(422).send(err);
        });
});

router.get('/photographers', (req, res) => {
    Photographer
        .find({})
        .select('-password -__v')
        .then(photographer => {
            res.send(photographer);
        })
        .catch(err => {
            res.status(422).send(err);
        });
});

module.exports = router;