const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const savedUser = await User.create({
      email,
      password,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      // throw new HttpError(409, "User with this email already exists");
      throw Conflict("User with this email already exists!");
    }

    throw error;
  }
}

/**
 * 1. Find user by email
 * 2. If user not exists => throw an error 401
 * 3. If user exists => check password
 * 4. If password is the same => then return 200
 */
async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw new HttpError(401, "email is not valid");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "password is not valid");
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  return res.json({
    data: {
      token,
    },
  });
}

module.exports = {
  register,
  login,
};
