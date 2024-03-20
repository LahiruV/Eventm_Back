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

router.route("/updatefeedback/").put(async (req, res) => {
    const { feedbackId, email, description, rating } = req.body;
    const feedback = {
        feedbackId, email, description, rating
    }
    const update = await Feedback.findOneAndUpdate({ feedbackId: feedbackId }, feedback).then(() => {
        res.status(200).send({ status: "Event FeedBack Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route('/deletefeedback/:feedbackId').delete((req, res) => {
    Feedback.findOneAndDelete({feedbackId:req.params.feedbackId})
        .then(() => res.json('Feedback deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
