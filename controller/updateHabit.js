
let habitCollectionModel = require("../model/habitModel");

// code for update the existing habit
module.exports.updateHabit=async (req,res)=>{
    try {
        
        let idToUpdate= req.params.idToUpdate;
        let update=await habitCollectionModel.findByIdAndUpdate(idToUpdate,req.body);
        if(update){
            res.redirect("back");
        }
        // if wrong idToUpdate(id of habit) is send by user then else block will run. 
        else{
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