const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendSchema = new Schema({
    crewID: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Attendance = mongoose.model('Attendance', attendSchema);
module.exports = Attendance;
