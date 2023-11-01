const express = require("express");

const routes = require("./routes");

const app = express();

app.get("/", (req, res) => {
  console.log({ method: req.method, url: req.url });

  res.send("Home");
});

app.use(routes);
// app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
