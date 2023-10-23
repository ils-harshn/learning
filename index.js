const users = {};

const io = require("socket.io")(3000, {
  cors: {
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://192.168.2.12:5500",
    ],
  },
});

io.on("connection", (socket) => {
  socket.on("send-msg", (msg) => {
    socket.broadcast.emit("receive-msg", {
      type: "msg-received",
      msg: msg,
      name: users[socket.id],
    });
  });

  socket.on("add-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", {
      type: "user-connected",
      msg: `${name} Joinied The Server`,
      name,
    });

    io.emit("update-users-list", {
      users: users,
    });
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      socket.broadcast.emit("user-disconnected", {
        type: "user-disconnected",
        msg: `${users[socket.id]} Disconnected`,
        name: users[socket.id],
      });

      delete users[socket.id];

      io.emit("update-users-list", {
        users: users,
      });
    }
  });
});
