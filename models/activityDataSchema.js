const mongoose = require("mongoose");

const activityDataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  steps: { type: Number, required: true },
  dayOfWeek: { type: Number, required: true },
});

const activityData = mongoose.model("activityData", activityDataSchema);

module.exports = activityData;
