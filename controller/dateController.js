
let jwt = require("jsonwebtoken");
let habitCollectionModel = require("../model/habitModel");
let userCollection= require("../model/userModel");

module.exports.date = async (req, res) => {

    try {
        let { year, month } = req.query;
        let { id } = req.params;

        let date = new Date();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        let paramDate = Number(id);
        year = Number(year);
        month = Number(month);

        let tokenFromClient = req.cookies.jwtToken;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);
            // console.log(decodedDataOfToken);
            let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

            if (isUser) {
                let data = await habitCollectionModel.find({
                    $and: [{ startingDate: { $gte: 1, $lte: paramDate } }, { startingMonth: currentMonth }, { startingYear: currentYear }, { user: decodedDataOfToken._id }]
                })

                // console.log(data);

                // res.redirect("/home");
                // res.redirect(`/date/${paramss.id}/?year=${queries.year}&&month=${queries.month}`);
                return res.render("home", {
                    data,
                    paramDate,
                    year,
                    month
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

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }

}