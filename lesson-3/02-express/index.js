const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log({ method: req.method, url: req.url });

  res.send("Home");
});

app.get("/movies", (req, res) => {
  console.log({ method: req.method, url: req.url });

  res.send("Movies");
});

app.post("/movies", (req, res) => {
  res.send("Movie created!");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
