const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const authRoutes = require("./auth");
const bookRoutes = require("./books");

router.use("/auth", authRoutes);
router.use("/books", auth, bookRoutes);

module.exports = router;
