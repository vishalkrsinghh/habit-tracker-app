
let mongoose= require("mongoose");

let compStatus= new mongoose.Schema({

    // todayDate:{
    //     type: Date,
    //     default: Date.now
    // },

    compDate:{
        type:String,
        require:true
    },
    compMonth:{
        type:String,
        require:true
    },
    compYear:{
        type:String,
        require:true
    },
    complStatus:{
        type:Boolean,
        require:true,
        default:null
    },
    todayNote:{
        type:String     
    },

    habit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"habitCollection"
    }

})

const completionStatusCollection= mongoose.model("completionStatusCollection", compStatus);

module.exports= completionStatusCollection;