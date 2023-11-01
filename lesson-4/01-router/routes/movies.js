const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Movies");
});

router.post("/", (req, res) => {
  res.send("Movie created");
});

module.exports = router;
