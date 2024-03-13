const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const payment = new Schema({

    paymentID: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    items: {
        type: String
    }, 
    date: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const payment_Schema = mongoose.model('payment', payment);
module.exports = payment_Schema;