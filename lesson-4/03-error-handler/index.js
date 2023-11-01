const fs = require("node:fs/promises");
const path = require("node:path");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log({ method: req.method, url: req.url });

  res.send("Home");
});

app.get("/movies", async (req, res, next) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "movies.txt"), {
      encoding: "utf-8",
    });

    res.send(data);
  } catch (error) {
    next(error);
  }
});

// /movies/1
// /movies/2
app.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  if (Number(id) === 1) {
    // return res.status(404).send("Movies Not Found");
    return next();
  }

  res.send(`Movie #${id}`);
});

app.post("/movies", (req, res) => {
  res.send("Movie created!");
});

// Handle 404 Error
app.use((_, res) => {
  res.status(404).send("Page Not Found:(");
});

// Handle Error
app.use((error, _, res, __) => {
  console.log(_.method);
  console.log("I am in middleware");
  console.error(error);

  res.status(500).send("Internal Server Error");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
