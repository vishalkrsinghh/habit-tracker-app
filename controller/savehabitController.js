
let CronJob = require('cron').CronJob;
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
                date1.setHours(date1.getHours()+5);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
                date1.setMinutes(date1.getMinutes()+30);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
                let todayDate = date1.getDate();
                let currentMonth = date1.getMonth() + 1;
                let currentYear = date1.getFullYear();
                console.log( "INDIAN date1= "," ",date1);

                if (month < 10) {
                    month = "0" + month;
                }
                if (date < 10) {
                    date = "0" + date;
                }
                if (date > todayDate || month > currentMonth || year > currentYear || date < 1 || month < currentMonth || year < currentYear || isNaN(month) || isNaN(date) || isNaN(year)) {
                    res.status(400).json({
                        message: "Please send current month's date and current year, and don't try to go in future."
                    })
                }
                else {
                  
                    let habit = await habitCollectionModel.create({
                        habitTitle: habitTitle,
                        habitDescription: habitDescription,
                        startingDate: `${year}-${month}-${date}`,
                        // startingDate: date,
                        // startingMonth: month,
                        // startingYear: year,
                        user: isUser._id
                    })

                    isUser.habits.push(habit._id);
                    isUser.save();

                    if (date <= todayDate) {

                        for (let i = date; i <= todayDate; i++) {
                            if (currentMonth < 10) {
                                currentMonth = "0" + currentMonth;
                            }
                            if (i > date && i < 10) {
                                i = "0" + i;
                            }
                            // console.log(i, " ", currentMonth);
                            let completeStatus = await completionModel.create({
                                allDate: `${currentYear}-${currentMonth}-${i}`,
                                habit: habit._id
                            })
                            habit.completionStatus.push(completeStatus._id);
                        }
                        habit.save();
                    }

                    // ('sec0-59 min0-59 hour0-23')
                    // let taskJob = new CronJob('0 0 1 * * 0-6', async () => {  //raat k 1 baj k 0 mint
                    // let taskJob = new CronJob('0 1 0 * * 0-6', async () => {  // raat k 12 baj k 1 mint
                    let taskJob = new CronJob('0 20 0 * * 0-6', async () => {  // raat k 12 baj k 1 mint
                    // let taskJob = new CronJob('0 22 14 * * 0-6', async () => {  //indiantimezone (BECAUSE WE HAVE Passed ANOTHER PARAM AS 'Asia/Kolkata') dopahar k 2 baj k 22 mint
                    // let taskJob = new CronJob('0 */3 * * * 0-6', async () => {  // for testing purpose every 3 minutes.
                        
                        let dt= new Date();
                        dt.setHours(dt.getHours()+5);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
                        dt.setMinutes(dt.getMinutes()+30);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
                        todayDate = dt.getDate();
                        currentMonth = dt.getMonth() + 1;
                        currentYear = dt.getFullYear();
                        console.log('Running a job at 01:00 in night at Asia/Kolkata');
                        // console.log('Running a job at every 3 minutes...... at Asia/Kolkata');
                        let isHabit = await habitCollectionModel.findOne({ _id: habit._id });
                        if (isHabit) {

                            if (currentMonth < 10) {
                                currentMonth = "0" + currentMonth;
                            }
                            if (todayDate < 10) {
                                todayDate = "0" + todayDate;
                            }
                            let completeStatus = await completionModel.create({
                                allDate: `${currentYear}-${currentMonth}-${todayDate}`,
                                habit: isHabit._id
                            })

                            isHabit.completionStatus.push(completeStatus._id);
                            isHabit.save();
                        }

                    }, null, true, 'Asia/Kolkata');
                    // }, null, true, 'America/New_York');
                    taskJob.start();
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
        // console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }

}