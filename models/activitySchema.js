const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  activityType: { type: String, required: true },
});

const activity = mongoose.model("activity", activitySchema);

module.exports = activity;
