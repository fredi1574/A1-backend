const bloodGlocuseModel = require("../models/bloodGlucose");

const addGlucose = async (request, response) => {
  const { username, hour, date, glucose } = request.body;
  console.log("Add blood Glucose:", username, hour, new Date(date), glucose);

  try {
    let existingGlucose = await bloodGlocuseModel.findOne({
      username,
      hour,
      date: new Date(new Date(date).setUTCHours(0, 0, 0, 0)),
    });
    if (existingGlucose) {
      existingGlucose.glucose = glucose;
      await existingGlucose.save();
      response.status(200).json(existingGlucose);
    } else {
      const newGlucose = await bloodGlocuseModel.create({
        username,
        hour,
        date: new Date(new Date(date).setUTCHours(0, 0, 0, 0)),
        glucose,
      });
      console.log(newGlucose);
      response.status(201).json(newGlucose);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getGlucose = async (request, response) => {
  const { username } = request.params;

  console.log(
    "Get blood glucose:",
    username,
    new Date().setUTCHours(0, 0, 0, 0)
  );

  try {
    const glucoseData = await bloodGlocuseModel.find({
      username,
      date: new Date().setUTCHours(0, 0, 0, 0),
    });
    response.status(200).json(glucoseData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getMonthlyGlucose = async (request, response) => {
  const { username } = request.params;

  try {
    // Get the current month and year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    console.log(`Current month: ${currentMonth}, Current year: ${currentYear}`);

    // Find all blood glucose data for the current month and user
    const monthlyGlucose = await bloodGlocuseModel.aggregate([
      {
        $match: {
          username: username,
          date: {
            $gte: new Date(currentYear, currentMonth, 1), // Start of current month
            $lt: new Date(currentYear, currentMonth + 1, 1), // End of current month
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          avgGlucose: { $avg: "$glucose" },
        },
      },
    ]);

    // Format data for recharts
    const formattedData = monthlyGlucose.map((day) => ({
      day: day._id,
      glucose: Math.round(day.avgGlucose),
    }));

    console.log(`Formatted data: ${JSON.stringify(formattedData)}`);

    response.json(formattedData);
  } catch (error) {
    console.error(`Error in getMonthlyGlucose: ${error.message}`);
    response.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addGlucose,
  getGlucose,
  getMonthlyGlucose,
};
