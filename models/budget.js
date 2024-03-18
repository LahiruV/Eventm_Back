const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budget = new Schema(
    {
       
        bid: {
            type: String,
            required: true
        },
        placeAbudget: {
            type: Number,
            default: 0
        },
        placePbudget: {
            type: Number,
            default: 0
        },
        crewAbudget: {
            type: Number,
            default: 0
        },
        crewPbudget: {
            type: Number,
            default: 0
        },
        promoAbudget: {
            type: Number,
            default: 0
        },
        promoPbudget: {
            type: Number,
            default: 0
        },
        fullBudget: {
            type: Number
        },
        name: {
            type: String
        },
        mail: {
            type: String
        },
        status: {
            type: String,
            default: "Active"
        }
    },
    {
        timestamps: true,
    }
);
const budget_Schema = mongoose.model(
    "budget",
    budget
);
module.exports = budget_Schema;
