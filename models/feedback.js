const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    feedbackId: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
