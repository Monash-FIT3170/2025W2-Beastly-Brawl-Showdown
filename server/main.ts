import { Meteor } from "meteor/meteor";
import { Server } from "socket.io";
import http from "http";
import GameSession from "./src/model/host/gameSession";
import { gameSessionHandler } from "./src/socket/gameSessionHandler";
import Player from "./src/model/game/player";

export const activeGameSessions: Map<number, GameSession> = new Map();
export const players = new Map<string, Player>();

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
    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id} (${reason})`);
      //need to add code to remove player from any games they're in...
    });
  });

  //listening
  // server.listen(PORT, () => {
  //   console.log(`Socket.IO server running on port ${PORT}`);
  // });
  //listening
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Socket.IO server running on port ${PORT}`);
  });
});
