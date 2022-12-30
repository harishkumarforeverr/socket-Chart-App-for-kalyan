const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // emeiting the emt to all the user
  socket.on("userAll", (payload) => {
    io.emit("userAll", payload);
  });
});

// app.listen(5000, () => console.log("server is active..."));

server.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});
