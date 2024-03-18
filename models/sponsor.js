const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sponsor = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        
        
    },
    {
        timestamps: true,
    }
);
const sponsor_Schema = mongoose.model(
    "sponsor",
    sponsor
);
module.exports = sponsor_Schema;
