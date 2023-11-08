let mongoose= require("mongoose");

let userSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },

    habit:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"habitCollection"
    }]

})

let userCollection= mongoose.model("userCollection", userSchema);
 
module.exports= userCollection;