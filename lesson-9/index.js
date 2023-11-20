require("./db");

const path = require("node:path");
const multer = require("multer");
const express = require("express");

const routes = require("./routes");

const app = express();

app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

app.use("/api", routes);

// Handle 404
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Handle 500
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.message === "Unexpected field") {
      return res.status(400).send({ message: "Invalid body" });
    }
  }

  res.status(500).send("Internal Server Error");
});

app.listen(8080, () => {
  console.info("Server started on port 8080");
});
