let jwt = require("jsonwebtoken")
let userCollection = require("../model/userModel")

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

            let todayDate = date.getDate();
            let currentMonth = date.getMonth()+1;
            let currentYear = date.getFullYear();
            // res.redirect("/home");
            res.redirect(`/date/${todayDate}/?year=${currentYear}&&month=${currentMonth}`);
        }else{
            return res.render("register");
        }
    }
    catch (err) {
        // console.log(err)
        res.render("register");
    }

}
module.exports.home = (req, res) => {
    res.render("home", {
        title: "Home"
    });
}

module.exports.logout=(req,res)=>{
    res.cookie("jwtToken","");
    return res.redirect("/");

}