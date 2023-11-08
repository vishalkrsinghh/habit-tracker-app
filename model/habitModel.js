
let mongoose = require("mongoose");

let habitSchema= new mongoose.Schema({

    habitTitle:{
        type:String,
        require:true
    },

    habitDescription:{
        type:String
    },

    startingDate:{
        type:String,
        require:true
    },
    startingMonth:{
        type:String,
        require:true
    },
    startingYear:{
        type:String,
        require:true
    },

    completionStatus:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"completionStatusCollection"
    }],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userCollection"
    }
})

const habitCollection= mongoose.model("habitCollection", habitSchema);

module.exports= habitCollection;