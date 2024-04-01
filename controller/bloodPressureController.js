const bloodPressureModel = require("../models/bloodPressureSchema");

const addPressure = async (request, response) => {
  const { username, hour, date, systolic, diastolic } = request.body;
  console.log("Add blood pressure:", username, hour, date, systolic, diastolic);

  try {
    let existingPressure = await bloodPressureModel.findOne({
      username,
      hour,
      date,
    });
    if (existingPressure) {
      existingPressure.systolic = systolic;
      existingPressure.diastolic = diastolic;
      await existingPressure.save();
      response.status(200).json(existingPressure);
    }

    const newPressure = await bloodPressureModel.create({
      username,
      hour,
      date,
      systolic,
      diastolic,
    });
    response.status(201).json(newPressure);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getPressure = async (request, response) => {
  const { username } = request.params;
  console.log("Get blood pressure:", username);

  try {
    const pressureData = await bloodPressureModel.find({ username });
    response.status(200).json(pressureData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPressure,
  getPressure,
};
