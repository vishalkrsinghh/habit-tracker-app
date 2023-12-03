
let jwt = require("jsonwebtoken");
let userCollection = require("../model/userModel");
let habitCollectionModel = require("../model/habitModel");
let completionModel = require("../model/completionModel");
module.exports.allHabits = async (req, res) => {

    try {

        let date = new Date();
        date.setHours(date.getHours()+5);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
        date.setMinutes(date.getMinutes()+30);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
        let todayDate = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        let tokenFromClient = req.cookies.jwtToken;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

            if (isUser) {
                let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                let allHabits = await habitCollectionModel.find({ user:isUser._id});
                // console.log(allHabits.length, allHabits);
                let sevenDay=[]
                // let start=new Date(new Date().setDate(new Date().getDate()-7))
                // let start=new Date(new Date().setDate(new Date().getDate()-6)); //// SET IT ALSO TO INDIAN DATE.
                // let start=new Date(new Date(new Date().setDate(new Date().getDate()-6)).setHours(new Date().getHours()+5,30)); //// SET IT ALSO TO INDIAN DATE.
                let date2 = new Date();
                date2.setHours(date2.getHours()+5);
                date2.setMinutes(date2.getMinutes()+30);
                let date3 = new Date();
                date3.setHours(date3.getHours()+5);
                date3.setMinutes(date3.getMinutes()+30);
                let start=new Date(new Date(date2.setDate(date2.getDate()-7))); //// SET IT ALSO TO INDIAN DATE.
                console.log("Start "," = ",start);
                console.log("date "," = ",date);
                // console.log("Acc. to indian "," = ",new Date(new Date(date.setDate(date.getDate()-6))));
                for(let i=0; i<allHabits.length; i++){
                    let sevenDays= await completionModel.find({

                        $and: [{habit:allHabits[i]._id}, 
                        {allDate: { $gte: start, $lte: date }}
                    ]
                    })
                    sevenDay.push(sevenDays);
                }
                // console.log(sevenDay);

                res.render("habitPage", {
                    allHabits,
                    start,
                    date,
                    date3,
                    sevenDay,
                    todayDate,
                    currentMonth,
                    currentYear,
                    days
                });
            }
            else {
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