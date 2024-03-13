const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemreg = new Schema({
    userName: {
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
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const system_Reg_Schema = mongoose.model('systemreg', systemreg);
module.exports = system_Reg_Schema;