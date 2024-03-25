const express = require("express");
const router = express.Router();
const { addSleepData } = require("../controller/sleepDataController");

router.post("/addSleep", addSleepData);
router.get("/getSleep/:username", addSleepData);

module.exports = router;
