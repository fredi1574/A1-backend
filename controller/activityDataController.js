const activityDataModel = require("../models/activityDataSchema");

const addSteps = async (request, response) => {
  const { username, date, steps, dayOfWeek } = request.body;
  console.log("Add steps:", username, date, steps, dayOfWeek);
  try {
    let existingActivityData = await activityDataModel.findOne({
      username,
      date,
    });
    if (existingActivityData) {
      existingActivityData.steps = steps;
      await existingActivityData.save();
      response.status(200).json(existingActivityData);
    } else {
      const newActivityData = await activityDataModel.create({
        username,
        date,
        steps,
        dayOfWeek,
      });
      response.status(201).json(newActivityData);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getSteps = async (request, response) => {
  const { username } = request.params;
  console.log("Get steps:", username);

  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Calculate the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const activityData = await activityDataModel.find({
      username,
      date: {
        $gte: new Date(`${currentYear}-${currentMonth}-01`),
        $lte: new Date(`${currentYear}-${currentMonth}-${daysInMonth}`),
      },
    });
    response.status(200).json(activityData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const addActivity = async (request, response) => {
  const { username, date, activityType } = request.body;
  console.log("Add activity data:", username, date, activityType);

  try {
    let existingActivityData = await activityDataModel.findOne({
      username,
      date,
    });

    if (existingActivityData) {
      existingActivityData.activityType = activityType;
      await existingActivityData.save();
      response.status(200).json(existingActivityData);
    } else {
      const newActivityData = await activityDataModel.create({
        username,
        date,
        activityType,
      });
      response.status(201).json(newActivityData);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getActivity = async (request, response) => {
  const { username } = request.params;
  console.log("Get activity data:", username);

  try {
    const activityData = await activityDataModel.find({ username });
    response.status(200).json(activityData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSteps,
  getSteps,
  addActivity,
  getActivity,
};
