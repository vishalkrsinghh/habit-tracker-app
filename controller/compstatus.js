
// get habitmodel
// get completionmodel 

module.exports.completeStatus= async (req,res)=>{

    let {id1,id2}= req.params;
    let {month,year, value}= req.query;

    // create in completionmodel.

    console.log(typeof id2, typeof month, year, value);
    res.redirect("back");
}