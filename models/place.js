const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const place = new Schema(
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
        image: {
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
const place_Schema = mongoose.model(
    "place",
    place
);
module.exports = place_Schema;