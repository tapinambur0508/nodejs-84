const express = require("express");

const bookSchema = require("./schemas/book");

const app = express();

// app.use(express.json());
const jsonParser = express.json();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/books", jsonParser, (req, res) => {
  const response = bookSchema.validate(req.body, { abortEarly: false });

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const { title, author, year } = response.value;

  console.log({ title, author, year });

  res.send("Book created");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
