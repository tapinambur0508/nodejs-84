const express = require("express");

const router = express.Router();

const authRoutes = require("./auth");
const bookRoutes = require("./books");

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);

module.exports = router;
