const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const payment = new Schema({

    paymentID: {
        type: Number,
        required: true
    },
    budID: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String
    }, 
}, {
    timestamps: true
});
const payment_Schema = mongoose.model('payment', payment);
module.exports = payment_Schema;