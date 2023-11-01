const express = require("express");

const users = require("./users");
const books = require("./books");
const movies = require("./movies");

const router = express.Router();

router.use("/users", users);
router.use("/books", books);
router.use("/movies", movies);

module.exports = router;
