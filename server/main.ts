import { Meteor } from "meteor/meteor";
import { Server } from "socket.io";
import http from "http";
import GameSession from "./src/model/host/gameSession";
import { gameSessionHandler } from "./src/socket/gameSessionHandler";

export const activeGameSessions: Map<number, GameSession> = new Map();

Meteor.startup(async () => {
  // initialise socket
  const server = http.createServer();
  const PORT = 3002;

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    gameSessionHandler(io, socket);
  });

  //listening
  server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
  });
});
