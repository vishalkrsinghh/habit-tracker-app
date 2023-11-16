
let jwt = require("jsonwebtoken");
let userCollection = require("../model/userModel");
let habitCollectionModel = require("../model/habitModel");
let completionModel = require("../model/completionModel");
module.exports.allHabits = async (req, res) => {

    try {

        let date = new Date();
        let todayDate = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        let tokenFromClient = req.cookies.jwtToken;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

            if (isUser) {
                let allHabits = await habitCollectionModel.find({ user:isUser._id});
                // console.log(allHabits.length, allHabits);
                let sevenDay=[]
                let start=new Date(new Date().setDate(new Date().getDate()-7))
                let startD=new Date(new Date().setDate(new Date().getDate()-7)).getDate()+1;
                let monthD=new Date(new Date().setDate(new Date().getDate()-7)).getMonth()+1;
                let yearD=new Date(new Date().setDate(new Date().getDate()-7)).getFullYear();
                for(let i=0; i<allHabits.length; i++){
                    let sevenDays= await completionModel.find({

                        $and: [{habit:allHabits[i]._id}, 
                        // {allDate: { $gte: `${year}-${month}-${paramDate}`, $lte: `${year}-${month}-${paramDate}` }}
                        {allDate: { $gte: start, $lte: new Date() }}
                    ]
                    })
                    sevenDay.push(sevenDays);
                }
                console.log(sevenDay);

                res.render("habitPage", {
                    allHabits,
                    startD,
                    monthD,
                    yearD,
                    sevenDay,
                    todayDate,
                    currentMonth,
                    currentYear
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
        console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }
}