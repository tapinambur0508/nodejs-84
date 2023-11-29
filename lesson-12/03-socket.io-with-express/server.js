const http = require("node:http");
const path = require("node:path");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/ping", (req, res) => {
  res.send("pong");
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
  console.log("Server started on port 8080");
});
