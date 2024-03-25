const mongoose = require("mongoose");

const sleepDataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  sleepHours: { type: Number, required: true },
  dayOfWeek: { type: Number, required: true },
});

const sleepData = mongoose.model("sleepData", sleepDataSchema);

module.exports = sleepData;
