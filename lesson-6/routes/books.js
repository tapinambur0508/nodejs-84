const express = require("express");

const BookController = require("../controllers/book");

const router = express.Router();
const jsonParser = express.json();

// Get books
router.get("/", BookController.getBooks);

// Get by by id
router.get("/:id", BookController.getBook);

// Create a book
router.post("/", jsonParser, BookController.createBook);

// Update book
router.put("/:id", jsonParser, BookController.updateBook);

// Delete book
router.delete("/:id", BookController.deleteBook);

module.exports = router;
