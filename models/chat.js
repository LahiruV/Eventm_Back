const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chat = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        mail: {
            type: String,
            required: true,
        } 
    },
    {
        timestamps: true,
    }
);
const chat_Schema = mongoose.model(
    "chat",
    chat
);
module.exports = chat_Schema;
