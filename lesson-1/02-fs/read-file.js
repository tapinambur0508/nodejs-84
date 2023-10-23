// const fs = require("node:fs");
// const fs = require("node:fs").promises;
const fs = require("node:fs/promises");

// fs.readFile("./read.txt", { encoding: "utf-8" }, (err, data) => {
//   if (err) {
//     throw err;
//   }

//   console.log(data);
// });

// console.log("Hello World!");

// fs.promises
//   .readFile("./read.txt", { encoding: "utf-8" })
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

async function readFile() {
  try {
    const data = await fs.readFile("./read.txt", "utf-8");

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile()
  .then(() => console.log("Done"))
  .catch((err) => console.error(err));
