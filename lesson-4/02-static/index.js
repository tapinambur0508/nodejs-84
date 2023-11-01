const express = require("express");

const app = express();

app.use(express.static("static"));

app.get("/users", (req, res) => {
  res.send("Users");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
