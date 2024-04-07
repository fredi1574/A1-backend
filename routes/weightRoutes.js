const express = require("express");
const router = express.Router();
const {
  addWeight,
  getWeight,
  getYearlyWeight,
} = require("../controller/weightController");

router.post("/addWeight", addWeight);
router.get("/getWeight/:username", getWeight);
router.get("/getYearlyWeight/:username", getYearlyWeight);

module.exports = router;
