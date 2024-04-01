const express = require("express");
const router = express.Router();
const {
  addPressure,
  getPressure,
} = require("../controller/bloodPressureController");

router.post("/addPressure", addPressure);
router.get("/getPressure/:username", getPressure);

module.exports = router;
