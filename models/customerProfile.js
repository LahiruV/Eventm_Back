const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerProfile = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
const customerProfile_Schema = mongoose.model('cus_profile', customerProfile);
module.exports = customerProfile_Schema;