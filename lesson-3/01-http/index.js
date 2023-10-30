const http = require("node:http");

const server = http.createServer((request, response) => {
  // console.log({ request });
  // console.log({ response });

  console.log({ method: request.method, url: request.url });

  if (request.url === "/") {
    return response.end("Home");
  }

  if (request.url === "/books" && request.method === "GET") {
    return response.end("Books");
  }

  if (request.url === "/users") {
    return response.end("Users");
  }

  response.statusCode = 404;
  response.end("Not Found");
});

server.listen(8080, () => {
  // PORT should be grater than 1500
  console.log("Server started on port 8080");
});
