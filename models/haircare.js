const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const haircare = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const haircare_Schema = mongoose.model(
    "haircare",
    haircare
);
module.exports = haircare_Schema;
