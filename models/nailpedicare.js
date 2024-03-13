const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nailpedicare = new Schema(
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
const nailpedicare_Schema = mongoose.model(
    "nailpedicare",
    nailpedicare
);
module.exports = nailpedicare_Schema;
