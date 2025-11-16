import express from "express";
import http from "http";

import { Server } from "socket.io";
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const connectedUsers: Record<string, string> = {};
export const getSocketId = (userId: string) => {
  return connectedUsers[userId];
};
io.on("connection", async (socket) => {
  console.log(`User connected successfully ${socket.id}`);
  const id = socket.handshake.query.user as string;
  connectedUsers[id] = socket.id;
  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete connectedUsers[id];
  });
});
