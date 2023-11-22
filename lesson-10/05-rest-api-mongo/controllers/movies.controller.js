const { HttpError } = require("../helpers/index.js");
const { Movie } = require("../models/movie");
const path = require("path");
const fs = require("fs/promises");

async function getMovies(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const movies = await Movie.find({}).skip(skip).limit(limit);
  return res.json(movies);
}

async function getMovie(req, res, next) {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    return next(HttpError(404, "Movie not found"));
  }
  return res.json(movie);
}

async function createMovie(req, res, next) {
  const { title } = req.body;
  const newMovie = await Movie.create({
    title,
  });
  res.status(201).json(newMovie);
}

async function deleteMovie(req, res, next) {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return next(HttpError(404, "No movie"));
  }
  await Movie.findByIdAndRemove(id);
  return res.status(200).json(movie);
}

async function uploadImage(req, res, next) {
  // req.file
  console.log("req.file", req.file);
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../tmp", filename);
  const publicPath = path.resolve(__dirname, "../public", filename);
  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }

  const movieId = req.params.id;

  const movie = await Movie.findById(movieId);
  movie.image = `/public/${filename}`;
  await movie.save();

  return res.json({
    data: {
      image: movie.image,
    },
  });
}

module.exports = {
  getMovie,
  getMovies,
  createMovie,
  deleteMovie,
  uploadImage,
};
