
let jwt= require("jsonwebtoken");
let userCollection = require("../model/userModel");
let habitCollectionModel = require("../model/habitModel");

module.exports.saveHabit = async (req, res) => {

    try {
        let { date } = req.params;
        let { year, month } = req.query
        let { habitTitle, habitDescription } = req.body;
        date= Number(date);
        year= Number(year);
        month= Number(month);
        let tokenFromClient = req.cookies.jwtToken;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

            if (isUser) {
                
                let habit= await habitCollectionModel.create({
                    habitTitle:habitTitle,
                    habitDescription:habitDescription,
                    startingDate:date,
                    startingMonth:month,
                    startingYear:year,
                    user:isUser._id
                })

                isUser.habits.push(habit._id);
                isUser.save();

                // console.log(habit);
                // return res.render("home")
                // return res.redirect("/home")
                let date1 = new Date();

                let todayDate = date1.getDate();
                let currentMonth = date1.getMonth()+1;
                let currentYear = date1.getFullYear();
                // res.redirect("/home");
                res.redirect(`/date/${todayDate}/?year=${currentYear}&&month=${currentMonth}`);
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