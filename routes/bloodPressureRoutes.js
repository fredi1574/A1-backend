const express = require("express");
const router = express.Router();
const {
  addPressure,
  getPressure,
  getMonthlyPressure,
} = require("../controller/bloodPressureController");

router.post("/addPressure", addPressure);
router.get("/getPressure/:username", getPressure);
router.get("/getMonthlyPressure/:username", getMonthlyPressure);

module.exports = router;
