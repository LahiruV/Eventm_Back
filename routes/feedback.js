const router = require('express').Router();
const Feedback = require('../models/feedback');

router.route('/addfeedback').post((req, res) => {
    const { feedbackId, email, description, rating } = req.body;
    const feedback = new Feedback({ feedbackId, email, description, rating });
    feedback.save()
        .then(() => res.json('Feedback added successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/allfeedback').get((req, res) => {
    Feedback.find()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/feedback/:email').get((req, res) => {
    Feedback.findById(req.params.email)
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updatefeedback/:id').put((req, res) => {
    Feedback.findById(req.params.id)
        .then(feedback => {
            feedback.feedbackId = req.body.feedbackId;
            feedback.email = req.body.email;
            feedback.description = req.body.description;
            feedback.rating = req.body.rating;

            feedback.save()
                .then(() => res.json('Feedback updated successfully'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deletefeedback/:id').delete((req, res) => {
    Feedback.findByIdAndDelete(req.params.id)
        .then(() => res.json('Feedback deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
