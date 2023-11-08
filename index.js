const express = require("express");
const path = require("path");

let app= express();
require("dotenv").config();
let PORT= process.env.PORT || 8000;
require("./config/mongooseConfiguration");

app.use(express.urlencoded())
app.use(express.json());
app.use(express.static(path.join(__dirname,"assets")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));

app.use("/", require("./routes/registerRoute"));


app.listen(PORT,()=>{
    console.log("srvr rn");
})