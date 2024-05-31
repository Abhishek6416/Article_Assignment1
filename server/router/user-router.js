const express = require("express");
const {
  REGISTER_USER_CONTROLLER,
  LOGIN_USER_CONTROLLER,
} = require("../controllers/user-controller");
const user_router = express.Router();
user_router.post("/register", REGISTER_USER_CONTROLLER);
user_router.post("/login", LOGIN_USER_CONTROLLER);
module.exports = user_router;
