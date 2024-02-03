const socketIO = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newBlog", (data) => {
    console.log("New blog event received:", data);

    io.sockets.emit("broadcastNewBlog", data);
  });

  socket.on("chatMessage", (data) => {
    console.log("Chat message received:", data);

    io.sockets.emit("broadcastChatMessage", data);
  });
});

module.exports = io;
