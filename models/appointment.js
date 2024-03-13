const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointment = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        nIC: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        paackage: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const appointment_Schema = mongoose.model(
    "appointment",
    appointment
);
module.exports = appointment_Schema;
