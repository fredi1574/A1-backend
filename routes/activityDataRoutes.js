const express = require("express");
const router = express.Router();
const { addSteps, getSteps } = require("../controller/stepsController");
const {
  addActivity,
  getActivity,
} = require("../controller/activityController");

router.post("/addSteps", addSteps);
router.get("/getSteps/:username", getSteps);

router.post("/addActivity", addActivity);
router.get("/getActivity/:username", getActivity);

module.exports = router;
