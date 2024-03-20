const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },

    gender:{
        type:String,
        required:true
    },

    contact:{
        type:Number,
        required:true
    },

    from:{
        type:String,
        required:true
    },

    cost:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('Crewdb',crewSchema)
