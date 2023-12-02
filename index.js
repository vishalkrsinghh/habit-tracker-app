const express = require("express");
const path = require("path");

let app= express();
require("dotenv").config();
let PORT= process.env.PORT || 8000;
require("./config/mongooseConfiguration");
let cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded())
app.use(express.json());
const ejsLayouts= require("express-ejs-layouts");  

app.use(ejsLayouts); 
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static(path.join(__dirname,"assets")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));

app.use("/", require("./routes/registerRoute"));

app.listen(PORT,()=>{
    let date= new Date();
    date.setHours(date.getHours()+5);
    date.setMinutes(date.getMinutes()+30);
    console.log(new Date(date.toISOString()), " = ", typeof new Date(date.toISOString()));
    console.log(date, " = ", typeof date);
    console.log("srvr rn");
})
