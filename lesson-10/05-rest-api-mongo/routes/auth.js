const express = require("express");

const { register, login } = require("../controllers/auth.controller");
const { tryCatchWrapper } = require("../helpers/index.js");

const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(login));

module.exports = {
  authRouter,
};
