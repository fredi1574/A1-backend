const mongoose = require("mongoose");

const bloodGlucoseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hour: { type: Number, required: true },
  date: { type: Date, required: true },
  glucose: { type: Number, required: true },
});

const bloodGlucose = mongoose.model("bloodGlucose", bloodGlucoseSchema);

module.exports = bloodGlucose;
