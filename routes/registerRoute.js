
const express= require("express");

let router= express.Router();

router.get("/", require("../controller/registerController").register);

router.post("/createUser", require("../controller/createUser").create);

module.exports= router;