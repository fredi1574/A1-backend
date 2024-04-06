const bloodPressureModel = require("../models/bloodPressureSchema");

const addPressure = async (request, response) => {
  const { username, hour, date, systolic, diastolic } = request.body;
  console.log(
    "Add blood pressure:",
    username,
    hour,
    new Date(date),
    systolic,
    diastolic
  );

  try {
    let existingPressure = await bloodPressureModel.findOne({
      username,
      hour,
      date: new Date(new Date(date).setUTCHours(0, 0, 0, 0)),
    });
    if (existingPressure) {
      existingPressure.systolic = systolic;
      existingPressure.diastolic = diastolic;
      await existingPressure.save();
      response.status(200).json(existingPressure);
    } else {
      const newPressure = await bloodPressureModel.create({
        username,
        hour,
        date: new Date(new Date(date).setUTCHours(0, 0, 0, 0)),
        systolic,
        diastolic,
      });
      console.log(newPressure);
      response.status(201).json(newPressure);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getPressure = async (request, response) => {
  const { username } = request.params;

  console.log(
    "Get blood pressure:",
    username,
    new Date().setUTCHours(0, 0, 0, 0)
  );

  try {
    const pressureData = await bloodPressureModel.find({
      username,
      date: new Date().setUTCHours(0, 0, 0, 0),
    });
    response.status(200).json(pressureData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getMonthlyPressure = async (request, response) => {
  const { username } = request.params;
  try {
    console.log(`Getting monthly pressure for ${username}`);

    // Get the current month and year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    console.log(`Current month: ${currentMonth}, Current year: ${currentYear}`);

    // Find all blood pressure data for the current month and user
    const monthlyPressure = await bloodPressureModel.aggregate([
      {
        $match: {
          username: username,
          date: {
            $gte: new Date(currentYear, currentMonth, 1), // Start of current month
            $lte: new Date(currentYear, currentMonth + 1, 0), // End of current month
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$date" },
          avgSystolic: { $avg: "$systolic" },
          avgDiastolic: { $avg: "$diastolic" },
        },
      },
    ]);

    console.log(`Monthly pressure data: ${JSON.stringify(monthlyPressure)}`);

    // Format data for recharts
    const formattedData = monthlyPressure.map((day) => ({
      day: day._id,
      systolic: Math.round(day.avgSystolic),
      diastolic: Math.round(day.avgDiastolic),
    }));

    console.log(`Formatted data: ${JSON.stringify(formattedData)}`);

    response.json(formattedData);
  } catch (error) {
    console.error(`Error in getMonthlyPressure: ${error.message}`);
    response.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addPressure,
  getPressure,
  getMonthlyPressure,
};
