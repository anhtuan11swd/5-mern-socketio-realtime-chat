import { Server } from "socket.io";

let io;
const userSocketMap = {};

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      credentials: true,
      origin:
        process.env.CLIENT_URL ||
        (process.env.NODE_ENV === "production"
          ? true
          : "http://localhost:5173"),
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getIo = () => io;

export const getReceiverSocketId = (userId) => userSocketMap[userId];
