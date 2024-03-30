const User = require("../models/userSchema");

// Controller function to create a new user
const createUser = async (request, response) => {
  const { username, password } = request.body;

  // Validate that the username doesn't already exist
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: "Username already exists" });
  }

  try {
    // Create a new user using the data from the request body
    const newUser = await User.create({ username, password });
    // Respond with the newly created user
    response.status(201).json(newUser);
  } catch (error) {
    // If an error occurs, respond with an error message
    response.status(400).json({ error: error.message });
  }
};

// Controller function to login a user
const loginUser = async (request, response) => {
  const { username, password } = request.body;
  console.log("Login user:", username, password);

  try {
    // Find the user by username and password
    const user = await User.findOne({ username, password });
    // If user is not found or password is incorrect, respond with an error
    if (!user) {
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }
    // Respond with success and optionally send user data or JWT token
    response.status(200).json({ success: true, user });
  } catch (error) {
    // If an error occurs, respond with an error message
    response.status(500).json({ error: error.message });
  }
};

const changePassword = async (request, response) => {
  const { username, oldPassword, newPassword } = request.body;
  console.log("User change password:", username, oldPassword, newPassword);

  try {
    const user = await User.findOne({ username, password: oldPassword });
    if (!user) {
      return response.status(401).json({ error: "Invalid password" });
    }
    user.password = newPassword;
    await user.save();
    response.status(200).json({ success: true });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Export the controller functions so they can be used in other files
module.exports = {
  createUser,
  loginUser,
  changePassword,
};
