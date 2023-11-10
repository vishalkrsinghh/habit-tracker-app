
const express= require("express");
const authentication= require("../middleware/jwtVerifyMiddleware")

let router= express.Router();

router.get("/:id",require("../controller/dateController").date )

module.exports= router;