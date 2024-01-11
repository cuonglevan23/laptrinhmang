const express = require("express");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const ip = require("ip");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.ORIGIN || "*",
  },
});

const users = {};
const socketToRoom = {};

// Set up file storage using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

const PORT = process.env.PORT || 5001;
const serverAddress = `http://${ip.address()}:${PORT}`;

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.on("join room", ({ roomID, user }) => {
    if (users[roomID]) {
      users[roomID].push({ userId: socket.id, user });
    } else {
      users[roomID] = [{ userId: socket.id, user }];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(
      (user) => user.userId !== socket.id
    );

    socket.emit("all users", usersInThisRoom);
    socket.broadcast.emit("user joined", { userId: socket.id, user });
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      user: payload.user,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("send message", (payload) => {
    io.emit("message", payload);
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((item) => item.userId !== socket.id);
      users[roomID] = room;
    }
    socket.broadcast.emit("user left", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on address ${serverAddress}`);
});
