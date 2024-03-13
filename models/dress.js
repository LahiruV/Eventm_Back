const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dress = new Schema(
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
        category: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const dress_Schema = mongoose.model(
    "dress",
    dress
);
module.exports = dress_Schema;
