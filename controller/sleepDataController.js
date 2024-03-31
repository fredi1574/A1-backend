const sleepDataModel = require("../models/sleepDataSchema");

const addSleepData = async (request, response) => {
  const { username, date, sleepHours, dayOfWeek } = request.body;
  console.log("Add sleep data:", username, date, sleepHours, dayOfWeek);
  try {
    let existingSleepData = await sleepDataModel.findOne({
      username,
      date,
    });

    if (existingSleepData) {
      existingSleepData.sleepHours = sleepHours;

      await existingSleepData.save();
      response.status(200).json(existingSleepData);
    } else {
      const newSleepData = await sleepDataModel.create({
        username,
        date,
        sleepHours,
        dayOfWeek,
      });
      response.status(201).json(newSleepData);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getSleepData = async (request, response) => {
  const { username } = request.params;
  console.log("Get sleep data:", username);

  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Calculate the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const sleepData = await sleepDataModel.find({
      username,
      date: {
        $gte: new Date(`${currentYear}-${currentMonth}-01`),
        $lte: new Date(`${currentYear}-${currentMonth}-${daysInMonth}`),
      },
    });
    response.status(200).json(sleepData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = { addSleepData, getSleepData };
