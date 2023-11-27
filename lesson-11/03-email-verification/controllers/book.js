const Book = require("../models/book");

async function getBooks(req, res, next) {
  console.log({ user: req.user });

  try {
    const books = await Book.find({ userId: req.user.id }).exec();

    res.send(books);
  } catch (err) {
    next(err);
  }
}

async function getBook(req, res, next) {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).exec();

    if (book === null) {
      return res.status(404).send("Book not found:(");
    }

    if (book.userId.toString() !== req.user.id) {
      // return res.status(403).send("Forbidden");
      return res.status(404).send("Book not found:(");
    }

    res.send(book);
  } catch (err) {
    next(err);
  }
}

async function createBook(req, res, next) {
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
    userId: req.user.id,
  };

  try {
    const result = await Book.create(book);

    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  const { id } = req.params;

  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  };

  try {
    const result = await Book.findByIdAndUpdate(id, book, { new: true });

    if (result === null) {
      return res.status(404).send("Book not found");
    }

    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Book.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).send("Book not found");
    }

    res.send({ id });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
