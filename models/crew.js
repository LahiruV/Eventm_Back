const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crew = new Schema(
    {
        crewID  : {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        cost: {
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
const crew_Schema = mongoose.model(
    "crew",
    crew
);
module.exports = crew_Schema;
