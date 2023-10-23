const fs = require("node:fs/promises");

// fs.writeFile("./write.txt", "I like It")
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

// fs.readFile("./read.txt", "utf-8")
//   .then((data) => fs.writeFile("./write.txt", data.toUpperCase()))
//   .then(() => console.log("Done"))
//   .catch((err) => console.error(err));

async function main() {
  try {
    const data = await fs.readFile("./read.txt", "utf-8");
    await fs.writeFile("./write.txt", data.toUpperCase());

    console.log("Done");
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((err) => console.error(err));
