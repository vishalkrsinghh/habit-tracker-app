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
    console.log("srvr rn");
})
