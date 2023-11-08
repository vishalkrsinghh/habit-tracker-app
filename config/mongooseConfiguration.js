
const mongoose= require("mongoose");
let url= process.env.MONGOURI;
mongoose.connect(url)
.then(()=>{
    console.log("Connected Succesfully");
}).catch((err)=>{
    console.log(err);
})

