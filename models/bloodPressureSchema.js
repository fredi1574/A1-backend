const mongoose = require("mongoose");

const bloodPressureSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hour: { type: Number, required: true },
  date: { type: Date, required: true },
  systolic: { type: Number, required: true },
  diastolic: { type: Number, required: true },
});

const bloodPressure = mongoose.model("bloodPressure", bloodPressureSchema);

module.exports = bloodPressure;
