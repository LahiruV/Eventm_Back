const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const package = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: String,
            required: true,
        },
        items: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const package_Schema = mongoose.model(
    "package",
    package
);
module.exports = package_Schema;
