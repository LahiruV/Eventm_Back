const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaves = new Schema(
    {
        uniqueId: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true,
        },
        fromDate: {
            type: String,
            required: true,
        },
        toDate: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const leaves_Schema = mongoose.model(
    "leaves",
    leaves
);
module.exports = leaves_Schema;
