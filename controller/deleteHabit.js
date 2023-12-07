
let habitCollectionModel = require("../model/habitModel");
let completionModel = require("../model/completionModel");
// business logic of deleting a habit.
module.exports.deleteHabit=async (req,res)=>{

    try {
        
        let idToDelete= req.params.idToDelete;
        let isHabitPresent=await habitCollectionModel.findByIdAndDelete(idToDelete);
        await completionModel.deleteMany({habit:idToDelete});
        if(isHabitPresent){
            res.redirect("back");
        }
        // idToDelete is wrong or wrong habit id given by user.
        else{
            res.status(400).json({
                message: "Error in deleting wrong data sent/Can't find Habit."
            })
        }

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }
}