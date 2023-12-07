let jwt = require("jsonwebtoken")
let userCollection = require("../model/userModel")

// Controller for showing/rendering Login/Register Page.
module.exports.register = async (req, res) => {

    try {
        let jwtToken = req.cookies.jwtToken;
        if (!jwtToken) {
           return res.render("register");
        }
        let decodedDataOfToken = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

        if (isUser) {
            let date = new Date();
            date.setHours(date.getHours()+5);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
            date.setMinutes(date.getMinutes()+30);//// Hosting/server machine time is based on UTC so converted into INDIAN Time for server if we want to work locally we can comment it.
            let todayDate = date.getDate();
            let currentMonth = date.getMonth()+1;
            let currentYear = date.getFullYear();
            // res.redirect("/home");
            res.redirect(`/date/${todayDate}/?year=${currentYear}&&month=${currentMonth}`);
        }
        /// if wrong token or token is present but empty then else block will run.
        else{
            return res.render("register");
        }
    }
    catch (err) {
        res.render("register");
    }

}
// module.exports.home = (req, res) => {
//     res.render("home", {
//         title: "Home"
//     });
// }

// logic for logout.
module.exports.logout=(req,res)=>{
    res.cookie("jwtToken","");
    return res.redirect("/");

}