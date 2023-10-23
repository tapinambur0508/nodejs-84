const fs = require("node:fs/promises");

fs.appendFile("./append.txt", `${new Date().toISOString()}\n`)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
