const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employee = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const employee_Schema = mongoose.model(
    "employee",
    employee
);
module.exports = employee_Schema;
