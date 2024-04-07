const weightModel = require("../models/weightSchema");

const addWeight = async (request, response) => {
  const { username, date, weight, weekNumber } = request.body;

  console.log(
    `Add weight: ${username}, date: ${date}, weight: ${weight}, weekNumber: ${weekNumber}`
  );

  try {
    let existingWeight = await weightModel.findOne({
      username,
      weekNumber,
    });
    if (existingWeight) {
      existingWeight.weight = weight;
      const updatedWeight = await existingWeight.save();
      response.status(200).json(updatedWeight);
    } else {
      const newWeight = await weightModel.create({
        username,
        weight,
        date,
        weekNumber,
      });
      console.log("Created new weight:", newWeight);
      response.status(201).json(newWeight);
    }
  } catch (err) {
    console.error("Error in addWeight:", err);
    response.status(500).json({ error: "Failed to add weight" });
  }
};

const getWeight = async (request, response) => {
  const { username } = request.params;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  console.log("Get weight:", username, currentYear, currentMonth);

  try {
    const weightData = await weightModel.findOne({
      username,
      currentYear,
      currentMonth,
    });

    console.log("Got weight:", weightData);

    // Respond with the fetched weight data
    response.status(200).json(weightData);
  } catch (error) {
    // Handle errors if any occur during the database operation
    response.status(500).json({ error: error.message });
  }
};

const getYearlyWeight = async (req, res) => {
  const { username } = req.params;
  const weight = await weightModel.find({ username });
  res.status(200).json(weight);
};

module.exports = { addWeight, getWeight, getYearlyWeight };
