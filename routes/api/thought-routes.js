// made with the help of my peers some code was recycled from class activities
const router = require('express').Router();

const {
    getThoughts, getOneThought, createThought, updateThought, deleteThought, createReaction, deleteReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
