require("./db");

const express = require("express");

const routes = require("./routes");

const app = express();

app.use("/api", routes);

// Handle 404
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Handle 500
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
});

app.listen(8080, () => {
  console.info("Server started on port 8080");
});
