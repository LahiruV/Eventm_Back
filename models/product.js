const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
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
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const product_Schema = mongoose.model(
    "product",
    product
);
module.exports = product_Schema;
