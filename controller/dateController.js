
let habitCollectionModel = require("../model/habitModel");

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

        // yaha p data fetch kar k home page p dikhana hai wo likhna hai jo lits hogi habit ki us din ki usko ul m print karwana hai render home k sath ek objecgt bhi bejh jisme data hoga.

        let data=await habitCollectionModel.find({
            $and: [{ startingDate: { $gte: 1, $lte: paramDate } }, { startingMonth: currentMonth }, { startingYear: currentYear }]
        })

        console.log(data);

        //  data m fetch karna hai is date p (is din ka date ke or is din se chote date ke sabhi habit ko show karna hai)
        // habit m query lagani hai find many wali.

        // res.redirect("/home");
        // res.redirect(`/date/${paramss.id}/?year=${queries.year}&&month=${queries.month}`);
        return res.render("home",{
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server side error/ Error in server side code"
        })
    }

}