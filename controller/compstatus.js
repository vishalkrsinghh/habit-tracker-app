
// let habitCollectionModel = require("../model/habitModel");
let completionModel = require("../model/completionModel");

module.exports.completeStatus = async (req, res) => {

    try {
        let { id, id2 } = req.params;  // id1 is us din ki id hai jis din ka ststus update karna hai. completionmodel ki id hai,  id2 is us din ka date.
        let { month, year, value } = req.query;
        id2 = Number(id2);
        month = Number(month);
        year = Number(year);
        value = JSON.parse(`${value}`.toLowerCase());

        let check = await completionModel.findByIdAndUpdate(id, { complStatus: value });
        console.log("check", check);

        // console.log(id,typeof id, month, year,typeof value, value);
        res.redirect(`/date/${id2}/?year=${year}&&month=${month}`);
        // res.redirect("back");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Error: " Error in Code, Server Side Error .",
            data: { error }
        })
    }
}