
let habitCollectionModel = require("../model/habitModel");
module.exports.updateHabit=async (req,res)=>{
    try {
        
        let idToUpdate= req.params.idToUpdate;
        let update=await habitCollectionModel.findByIdAndUpdate(idToUpdate,req.body);
        console.log(req.body);
        if(update){
            res.redirect("back");
        }else{
            res.status(400).json({
                message: "Error in updating wrong data sent/Can't find Habit."
            })
        }

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }
}