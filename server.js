require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/userRoutes");
const sleepDataRoutes = require("./routes/sleepDataRoutes");

const dbURI = process.env.DB_URI;
const port = process.env.PORT;

mongoose
  .connect(dbURI)
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log("error connecting to mongoDB:" + error));

// Routes
app.use(express.json());
app.use("/users", userRoutes);
app.use("/sleep", sleepDataRoutes);

// Error handling
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send("Server error");
});

const PORT = port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
