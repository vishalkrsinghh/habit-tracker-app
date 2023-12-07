//// this file is because vercel has its own cron job or I hosted it on vercel, if hosted anywhere else delete this file, it works on manually clicking on run button of cron in vercel website . 
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
            // if habits present in database then create object in completionModel for next day to all that habits.
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
                allHabits[i].save();
            }

    
            return res.status(200).json({
                message: "OK "
            })
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
