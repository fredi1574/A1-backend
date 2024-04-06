const express = require("express");
const router = express.Router();
const {
  addGlucose,
  getGlucose,
  getMonthlyGlucose,
} = require("../controller/bloodGlucoseController");

router.post("/addGlucose", addGlucose);
router.get("/getGlucose/:username", getGlucose);
router.get("/getMonthlyGlucose/:username", getMonthlyGlucose);

module.exports = router;
