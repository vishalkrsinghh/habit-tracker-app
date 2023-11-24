
const express= require("express");
const authentication= require("../middleware/jwtVerifyMiddleware")

let router= express.Router();

router.get("/", require("../controller/registerController").register);

router.post("/createUser", require("../controller/createUser").create);

router.post("/home", require("../controller/createUser").login);

router.get("/logout", require("../controller/registerController").logout)

router.get("/home",authentication.auth,require("../controller/registerController").home );

router.post("/date/:date",authentication.auth, require("../controller/savehabitController").saveHabit);

router.use("/date",authentication.auth,require("./getDate") );
router.get("/allhabits",authentication.auth, require("../controller/showAllHabits").allHabits);

router.post("/update_habit/:idToUpdate",authentication.auth, require("../controller/updateHabit").updateHabit);
router.get("/delete_habit/:idToDelete",authentication.auth,require("../controller/deleteHabit").deleteHabit);
router.get("/calendar", authentication.auth, require("../controller/calendarController").getCalendarPage);
router.get("/calendar/habit", authentication.auth, require("../controller/calendarController").getCalendar);

router.get("/complitionstatus/:id/:id2",authentication.auth,require("../controller/compstatus").completeStatus);

module.exports= router;