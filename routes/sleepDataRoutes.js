const express = require("express");
const router = express.Router();
const {
  addSleepData,
  getSleepData,
} = require("../controller/sleepDataController");

router.post("/addSleep", addSleepData);
router.get("/getSleep/:username", getSleepData);

module.exports = router;
