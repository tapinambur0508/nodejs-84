const { readMovies } = require("./movies/index.js");

readMovies()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
