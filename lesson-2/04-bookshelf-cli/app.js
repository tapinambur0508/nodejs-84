const { program } = require("commander");

const Books = require("./books/index");

async function invokeAction({ action, id, title, author }) {
  switch (action) {
    case "getAll":
      const books = await Books.getAll();
      return console.log(books);
    case "getById":
      const book = await Books.getById(id);
      return console.log(book);
    case "create":
      const createdBook = await Books.create({ title, author });
      return console.log(createdBook);
    case "update":
      const updatedBook = await Books.update(id, { title, author });
      return console.log(updatedBook);
    case "remove":
      const removedBook = await Books.remove(id);
      return console.log(removedBook);
    default:
      console.log("Unknown action:(");
  }
}

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Book id")
  .option("-t, --title <title>", "Book title")
  .option("-at, --author <author>", "Book author");

program.parse(process.argv);

const options = program.opts();

console.log(options);

invokeAction(options);

// npm start -- --action getAll
