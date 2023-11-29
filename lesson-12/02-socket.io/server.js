const http = require("node:http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("chatMessage", "Welcome to chat");
  socket.broadcast.emit("chatMessage", "New user connected to chat");

  socket.on("chatMessage", (message) => {
    const data = JSON.parse(message);

    socket.emit("chatMessage", `You: ${data.message}`);
    socket.broadcast.emit("chatMessage", `${data.name}: ${data.message}`);
  });
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
