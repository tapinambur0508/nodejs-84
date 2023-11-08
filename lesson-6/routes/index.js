const express = require("express");

const router = express.Router();

const bookRoutes = require("./books");

router.use("/books", bookRoutes);

module.exports = router;
