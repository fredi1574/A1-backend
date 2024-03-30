const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  changePassword,
} = require("../controller/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/changePassword", changePassword);

module.exports = router;
