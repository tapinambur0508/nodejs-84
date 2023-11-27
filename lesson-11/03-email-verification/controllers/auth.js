const crypto = require("node:crypto");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const sendEmail = require("../helpers/sendEmail");

async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomUUID();

    await sendEmail({
      to: email,
      subject: "Welcome to BookShelf",
      html: `To confirm your registration please click on the <a href="http://localhost:8080/api/auth/verify/${verifyToken}">link</a>`,
      text: `To confirm your registration please open the link http://localhost:8080/api/auth/verify/${verifyToken}`,
    });

    await User.create({ name, email, verifyToken, password: passwordHash });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      console.log("EMAIL");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("PASSWORD");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    if (user.verify !== true) {
      return res.status(401).send({ message: "Your account is not verified" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 } // token expires in one our
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function verify(req, res, next) {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verifyToken: token }).exec();

    if (user === null) {
      return res.status(404).send({ message: "Not found" });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

    res.send({ message: "Email confirm successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, verify };
