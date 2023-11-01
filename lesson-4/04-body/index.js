const express = require("express");

const app = express();

// app.use(express.json());
const jsonParser = express.json();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/books", jsonParser, (req, res) => {
  const { title, author, year } = req.body;

  console.log({ title, author, year });

  res.send("Book created");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
