const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    contact:{
        type:Number,
        required:true
    },

    cost:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('Sponsordb',sponsorSchema)

