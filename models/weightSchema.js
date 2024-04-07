const mongoose = require("mongoose");

const weightSchema = new mongoose.Schema({
  username: { type: String, required: true },
  weight: { type: Number, required: true },
  date: { type: Date, required: true },
  weekNumber: { type: Number, required: true },
});

const weight = mongoose.model("weight", weightSchema);

module.exports = weight;
