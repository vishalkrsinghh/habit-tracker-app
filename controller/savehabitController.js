
let cron = require('node-cron');
let jwt = require("jsonwebtoken");
let userCollection = require("../model/userModel");
let habitCollectionModel = require("../model/habitModel");
let completionModel = require("../model/completionModel");

module.exports.saveHabit = async (req, res) => {

    try {
        let { date } = req.params;
        let { year, month } = req.query
        let { habitTitle, habitDescription } = req.body;
        date = Number(date);
        year = Number(year);
        month = Number(month);
        let tokenFromClient = req.cookies.jwtToken;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

            if (isUser) {

                let date1 = new Date();

                let todayDate = date1.getDate();
                let currentMonth = date1.getMonth() + 1;
                let currentYear = date1.getFullYear();

                if (date > todayDate || month > currentMonth || year > currentYear || date < 1 || month < currentMonth || year < currentYear || isNaN(month) || isNaN(date) || isNaN(year)) {
                    res.status(400).json({
                        message: "Please send current month's date and current year, and don't try to go in future."
                    })
                }
                else {
                    let habit = await habitCollectionModel.create({
                        habitTitle: habitTitle,
                        habitDescription: habitDescription,
                        startingDate: date,
                        startingMonth: month,
                        startingYear: year,
                        user: isUser._id
                    })

                    isUser.habits.push(habit._id);
                    isUser.save();
                    
                    if(date<=todayDate){

                        for(let i=date; i<=todayDate; i++){
                            let completeStatus=await completionModel.create({
                                compDate:i,
                                compMonth:currentMonth,
                                compYear:currentYear,
                                habit:habit._id
                            })
                            habit.completionStatus.push(completeStatus._id);
                        }
                         habit.save();
                    }


                    // let task = cron.schedule('0 1 * * *', async () => {
                    let task = cron.schedule('1 0 * * *', async () => {
                    // let task = cron.schedule('*/3 * * * *', async () => { // for testing purpose
                        console.log('Running a job at 01:00 in night at Asia/Kolkata');
                        let isHabit = await habitCollectionModel.findOne({ _id: habit._id });
                        if (isHabit) {
                            let completeStatus=await completionModel.create({
                                compDate:todayDate,
                                compMonth:currentMonth,
                                compYear:currentYear,
                                habit:isHabit._id
                            })

                            isHabit.completionStatus.push(completeStatus._id);
                            isHabit.save();
                        }

                    }, {
                        scheduled: true,
                        timezone: "Asia/Kolkata"
                    });
                    // task.start();
                    // task.stop(); if want to stop task.

                    // console.log(habit);
                    // return res.render("home")
                    // return res.redirect("/home")

                    // res.redirect("/home");
                    // res.redirect(`/date/${todayDate}/?year=${currentYear}&&month=${currentMonth}`); // when user creates new habit then send it to current date/day.
                    res.redirect(`/date/${date}/?year=${year}&&month=${month}`);  // when user creates new habit then send it to that date/day for wich user creates the habit..
                }
            } else {
                return res.redirect("/");
            }

        }
        else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }

}