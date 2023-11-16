
let jwt = require("jsonwebtoken");
let habitCollectionModel = require("../model/habitModel");
let userCollection = require("../model/userModel");
let completionModel = require("../model/completionModel");

module.exports.date = async (req, res) => {

    try {
        let { year, month } = req.query;
        let { id } = req.params;

        let date = new Date();
        let todayDate = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        let paramDate = Number(id);
        year = Number(year);
        month = Number(month);

        if (paramDate > todayDate || month > currentMonth || year > currentYear || paramDate < 1 || month < currentMonth || year < currentYear || isNaN(month) || isNaN(paramDate) || isNaN(year)) {
            res.status(400).json({
                message: "Please send current month's date and current year, and don't try to go in future."
            })
        } else {
            let tokenFromClient = req.cookies.jwtToken;
            if (tokenFromClient) {
                let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);
                // console.log(decodedDataOfToken);
                let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

                if (isUser) {
                    let data = await habitCollectionModel.find({
                        $and: [{ startingDate: { $gte: 1, $lte: paramDate } }, { startingMonth: currentMonth }, { startingYear: currentYear }, { user: decodedDataOfToken._id }]
                    })

                    let dateDetail=[];
                    // console.log(data);
                    if(month<10){
                        month="0"+month;
                    }
                    if(paramDate<10){
                        paramDate="0"+paramDate;
                    }
                    for(let i=0; i<data.length; i++){
                    let onThatDateDetail= await completionModel.findOne({
                        // change a littlebit here below in compdate,compyear and compmonth
                        $and: [{habit:data[i]._id}, 
                        {allDate:`${year}-${month}-${paramDate}`}
                        // {compDate:paramDate},{compYear:year},{compMonth:month}
                    ]
                    })
                    dateDetail.push(onThatDateDetail);
                    }

                    // console.log(dateDetail);
                    // res.redirect("/home");
                    // res.redirect(`/date/${paramss.id}/?year=${queries.year}&&month=${queries.month}`);
                    return res.render("home", {
                        data,
                        paramDate,
                        year,
                        month,
                        dateDetail
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
        console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }

}