
const express= require("express");
const authentication= require("../middleware/jwtVerifyMiddleware")

let router= express.Router();

router.get("/", require("../controller/registerController").register);

router.post("/createUser", require("../controller/createUser").create);

router.post("/home", require("../controller/createUser").login);

router.get("/logout", require("../controller/registerController").logout)

router.get("/home",authentication.auth,require("../controller/registerController").home );

router.use("/date",authentication.auth,require("./getDate") );

module.exports= router;