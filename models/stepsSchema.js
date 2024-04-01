const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  steps: { type: Number, required: true },
  dayOfWeek: { type: Number, required: true },
});

const steps = mongoose.model("step", stepSchema);

module.exports = steps;
