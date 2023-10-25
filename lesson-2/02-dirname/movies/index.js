const fs = require("node:fs/promises");
const path = require("node:path");

async function readMovies() {
  const filePath = path.join(__dirname, "..", "data", "movies.txt");

  console.log({ filePath });

  const data = await fs.readFile(filePath, { encoding: "UTF-8" });

  return data;
}

module.exports = { readMovies };
