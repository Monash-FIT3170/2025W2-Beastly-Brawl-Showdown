import { Meteor } from "meteor/meteor";
import { Server } from "socket.io";
import { gameSessionHandler } from "./src/socket/gameSessionHandler";
import http from "http";
import GameSession from "./src/model/host/gameSession";
import Player from "./src/model/game/player";

export const activeGameSessions: Map<number, GameSession> = new Map();
export const players = new Map<string, Player>();

Meteor.startup(async () => {
  // Initialise socket
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
    // All game session functions are handled in the gameSessionHandler
    gameSessionHandler(io, socket);
    // Called when socket disconnects from server
    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id} (${reason})`);
      // Remove player from game session
      if (players.has(socket.id)) {
        const player = players.get(socket.id);
        const code = player?.getGameCode();
        const session = activeGameSessions.get(Number(code));
        // Checks session exists
        if (session) {
          session.removePlayer(socket.id);
          // Updates host pages
          io.to(`game-${code}`).emit("update-players", {
            message: `Player ${player?.name} - ${socket.id} disconnected.`,
            players: session.players.getItems(),
          });
        }
        players.delete(socket.id);
      }
    });
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Socket.IO server running on port ${PORT}`);
  });
});
