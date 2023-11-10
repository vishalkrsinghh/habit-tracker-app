

module.exports.date=(req,res)=>{
    let queries=req.query;
    let paramss= req.params;
    console.log(queries,paramss)
    // console.log(typeof queries.year) // string

    
    res.redirect("/home");

}