
let jwt = require("jsonwebtoken");
let completionModel = require("../model/completionModel");
let habitCollectionModel = require("../model/habitModel");
module.exports.getCalendarPage = async (req, res) => {

    try {
        let tokenFromClient = req.cookies.jwtToken;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);
            let isAnyHabit = await habitCollectionModel.findOne({ user: decodedDataOfToken._id });

            if (isAnyHabit) {
                res.render("calendar");
            } else {
                res.redirect("back");
            }

        }
        else {
            return res.render("register");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }

}


module.exports.getCalendar = async (req, res) => {

    try {
                let id = req.query.id;
                if(id){
                    let data = await completionModel.find({ habit: id });
                    if(data){
                        res.status(200).json({
                            message: "ok",
                            data
                        })
                    }else{
                        res.status(200).json({
                            message: "Send the correct habit Id",
                            data:[]
                        })
                    }
                }else{
                    res.redirect("back");
                }

    } catch (error) {
        console.log(error);
        res.status(200).json({
            message: "Send the correct habit Id",
            data:[]
        })
    }

}