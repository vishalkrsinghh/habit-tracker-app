const express = require("express");
const path = require("path");

let app= express();
require("dotenv").config();
let PORT= process.env.PORT || 8000;

app.use(express.static(path.join(__dirname,"assets")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));
console.log(__dirname);

app.get("/", (req,res)=>{

    res.render("register");
})

app.listen(PORT,()=>{
    console.log("srvr rn");
})