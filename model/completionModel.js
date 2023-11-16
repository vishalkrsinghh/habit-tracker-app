
let mongoose= require("mongoose");

let compStatus= new mongoose.Schema({

    // todayDate:{
    //     type: Date,
    //     default: Date.now
    // },

    // compDate:{
    //     type:Number,
    //     require:true
    // },
    // compMonth:{
    //     type:Number,
    //     require:true
    // },
    // compYear:{
    //     type:Number,
    //     require:true
    // },

    allDate:{
        type: Date,
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