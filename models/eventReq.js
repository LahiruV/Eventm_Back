const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventReq = new Schema(
    {
        uniqueId: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        eventDate: {
            type: String,
            required: true
        },
        eventTime: {
            type: String,
            required: true
        },
        expectedGuests: {
            type: String,
            required: true
        },
        eventType: {
            type: String,
            required: true
        },
        venueDescription: {
            type: String,
            required: true
        },
        venuePreference: {
            type: String,
            required: true
        },
        accessibilityRequirements: {
            type: String,
            required: true
        },
        staffRequired: {
            type: [String],
            required: true
        },
        estimatedBudgetRange: {
            type: String,
            required: true
        }, 
        status: {
            type: String,
            required: true,
            default: "Pending"
        },        
    },
    {
        timestamps: true
    }
);
const eventReq_Schema = mongoose.model(
    "eventReq",
    eventReq
);
module.exports = eventReq_Schema;
