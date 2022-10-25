// made with the help of my peers some code was recycled from class activities
const {Thought, User} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .select('-__v')
            .then((thought) => !thought ? res.status(404).json({message: 'Could not find Thought with this ID'}) : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$addToSet: {thoughts: thought._id}},
                    {new: true}
                );
            })
            .then((user) => !user ? res.status(404).json({message: 'Thought has been created, but User id could not be found'}) : res.json('Thought created!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then((thought) => !thought ? res.status(404).json({message: 'This id has no thoughts!'}) : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) => !thought ? res.status(404).json({message: 'This id has no thoughts!'}) : User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
            )
            .then((user) => !user ? res.status(404).json({message: 'Thought has been deleted, but no user id was attached!'}) : res.json({message: 'Thought successfully deleted'})
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
            .then((thought) => !thought ? res.status(404).json({message: 'This id has no thoughts!'}) : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
            .then((thought) => !thought ? res.status(404).json({message: 'This id has no thoughts!'}) : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
