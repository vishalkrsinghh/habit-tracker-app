
let completionModel = require("../model/completionModel");
module.exports.getCalendarPage=(req,res)=>{
    
    res.render("calendar");
}
module.exports.getCalendar=async(req,res)=>{

    try {
        let id=req.query.id;
        let data= await completionModel.find({habit:id});
    res.status(200).json({
        message:"ok",
        data
    })        
    } catch (error) {
        
    }

    // res.render("calendar");
}