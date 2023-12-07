
let completionModel = require("../model/completionModel");
// for update the status of the habit.
module.exports.completeStatus = async (req, res) => {

    try {
        let { id, id2 } = req.params;
        let { month, year, value } = req.query;
        id2 = Number(id2);
        month = Number(month);
        year = Number(year);
        value = JSON.parse(`${value}`.toLowerCase());  // change string to boolean.

        await completionModel.findByIdAndUpdate(id, { complStatus: value });

        // console.log(id,typeof id, month, year,typeof value, value);
        res.redirect(`/date/${id2}/?year=${year}&&month=${month}`);
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            Error: " Error in Code, Server Side Error .",
            data: { error }
        })
    }
}