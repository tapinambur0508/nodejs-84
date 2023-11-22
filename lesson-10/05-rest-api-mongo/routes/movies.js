const express = require("express");
const { tryCatchWrapper } = require("../helpers/index.js");
const {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  uploadImage,
} = require("../controllers/movies.controller");
const { validateBody, upload } = require("../middlewares");
const { addMovieSchema } = require("../schemas/movies");
const routerMovies = express.Router();

routerMovies.get("/", tryCatchWrapper(getMovies));
routerMovies.get("/:id", tryCatchWrapper(getMovie));
routerMovies.post(
  "/",
  validateBody(addMovieSchema),
  tryCatchWrapper(createMovie)
);
routerMovies.delete("/:id", tryCatchWrapper(deleteMovie));
routerMovies.patch(
  "/:id/image",
  upload.single("image"),
  tryCatchWrapper(uploadImage)
);

module.exports = {
  routerMovies,
};
