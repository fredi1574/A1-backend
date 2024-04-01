const activityDataModel = require("../models/activitySchema");

const addActivity = async (request, response) => {
  const { username, date, activityType } = request.body;
  console.log("Add activity data:", username, date, activityType);

  try {
    const newActivityData = await activityDataModel.create({
      username,
      date,
      activityType,
    });
    response.status(201).json(newActivityData);
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

module.exports = { addActivity, getActivity };
