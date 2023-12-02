
let mongoose = require("mongoose");

let habitSchema = new mongoose.Schema({

    habitTitle: {
        type: String,
        require: true
    },

    habitDescription: {
        type: String,
        require: true
    },
    startingDate: {
        type: Date,
        require:true
    },
    // startingDate:{
    //     type:Number,
    //     require:true
    // },
    // startingMonth:{
    //     type:Number,
    //     require:true
    // },
    // startingYear:{
    //     type:Number,
    //     require:true
    // },

    completionStatus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "completionStatusCollection"
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection"
    }
})

const habitCollection = mongoose.model("habitCollection", habitSchema);

module.exports = habitCollection;