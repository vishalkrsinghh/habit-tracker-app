
let jwt = require("jsonwebtoken");
let habitCollectionModel = require("../model/habitModel");
let userCollection = require("../model/userModel");
let completionModel = require("../model/completionModel");

//on click Home page Dates link then this controller will run.
module.exports.date = async (req, res) => {

    try {
        let { year, month } = req.query;
        let { id } = req.params;
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let date = new Date();
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);
        let todayDate = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        let paramDate = Number(id);
        year = Number(year);
        month = Number(month);
        if (paramDate > todayDate || month > currentMonth || year > currentYear || paramDate < 1 || month < currentMonth || year < currentYear || isNaN(month) || isNaN(paramDate) || isNaN(year)) {
            res.status(400).json({
                message: "Please send current month's date and current year, and don't try to go in future and past from this month."
            })
        } else {
            let tokenFromClient = req.cookies.jwtToken;
            if (tokenFromClient) {
                let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);
                let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

                if (isUser) {
                    if (month < 10) {
                        month = "0" + month;
                    }
                    if (paramDate < 10) {
                        paramDate = "0" + paramDate;
                    }
                    // find all the habits that created before of that date or created on that date of the same user who is login.
                    let data = await habitCollectionModel.find({
                        // $and: [{ startingDate: { $gte: 1, $lte: paramDate } }, { startingMonth: currentMonth }, { startingYear: currentYear }, { user: decodedDataOfToken._id }]///
                        $and: [{ startingDate: { $lte: `${year}-${month}-${paramDate}` } }, { user: decodedDataOfToken._id }]    //IF NEXT MONTH PROBLEM IN HOME PAGE CHECK HERE.
                    })

                    let dateDetail = [];
                    // console.log(data);
                    // Now find status of all the habits of that date or created on that date from completionModel.
                    // which will help us to identify that task is done or not on that date.
                    // run a loop for each element of data variable/array(Beacuse data array store all the habits of that date or before that date) to find it's status on that date from completionModel
                    for (let i = 0; i < data.length; i++) {
                        let onThatDateDetail = await completionModel.findOne({
                            $and: [{ habit: data[i]._id },
                            { allDate: `${year}-${month}-${paramDate}` }
                            ]
                        })
                        dateDetail.push(onThatDateDetail);
                    }

                    // show all the habits and status of that date in home page all habits's status of that date is stores in dateDetail variable which is an array.
                    return res.render("home", {
                        data,
                        paramDate,
                        year,
                        month,
                        dateDetail,
                        months
                    })
                } else {
                    res.redirect("/");
                    // res.status(400).json({
                    //     message:"invalid Token/ Unauthorised"
                    // }) 
                }

            }
            else {
                res.redirect("/");
                // res.status(400).json({
                //     message:"Token not found/ Unauthorised "
                // })
            }
        }

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }

}