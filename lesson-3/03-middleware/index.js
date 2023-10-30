const fs = require("node:fs/promises");
const path = require("node:path");

const express = require("express");

const checkAuth = require("./middleware/checkAuth");

const app = express();

// app.use(checkAuth);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/books", checkAuth);

app.get("/books", (req, res) => {
  const filePath = path.join(__dirname, "books.json");

  fs.readFile(filePath, { encoding: "UTF-8" })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Infernal Sever Error");
    });
});

// app.post("/books", checkAuth, (req, res) => {
//   res.send("Book created");
// });

app.post("/books", (req, res) => {
  res.send("Book created");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
