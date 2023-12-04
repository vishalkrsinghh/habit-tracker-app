
let habitCollectionModel = require("../model/habitModel");
let completionModel = require("../model/completionModel");

module.exports.handler = async (req, res) => {

    try {
        let allHabits = await habitCollectionModel.find({});
        let dt = new Date();
        dt.setHours(dt.getHours() + 5);
        dt.setMinutes(dt.getMinutes() + 30);
        todayDate = dt.getDate();
        currentMonth = dt.getMonth() + 1;
        currentYear = dt.getFullYear();
    
        if (allHabits) {
            for (let i = 0; i < allHabits.length; i++) {
                if (currentMonth < 10) {
                    currentMonth = "0" + currentMonth;
                }
                if (todayDate < 10) {
                    todayDate = "0" + todayDate;
                }
                let completeStatus = await completionModel.create({
                    allDate: `${currentYear}-${currentMonth}-${todayDate}`,
                    habit: allHabits[i]._id
                })
                allHabits[i].completionStatus.push(completeStatus._id);
            }
            allHabits.save();
    
            return res.redirect("back");
        } else {
            return;
        }
    } catch (error) {
         // console.log(error);
         res.status(500).json({
            Error: " Error in Code, Server Side Error CRON.",
        })
    }
  
}