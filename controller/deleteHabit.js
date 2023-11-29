
let habitCollectionModel = require("../model/habitModel");
let completionModel = require("../model/completionModel");
module.exports.deleteHabit=async (req,res)=>{

    try {
        
        let idToDelete= req.params.idToDelete;
        // await completionModel.remove({habit:idToDelete});
        let isHabitPresent=await habitCollectionModel.findByIdAndDelete(idToDelete);
        await completionModel.deleteMany({habit:idToDelete});
        if(isHabitPresent){
            res.redirect("back");
        }else{
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