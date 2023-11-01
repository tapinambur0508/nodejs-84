const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Books");
});

router.post("/", (req, res) => {
  res.send("Book created");
});

module.exports = router;
