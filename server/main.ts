import { Meteor } from "meteor/meteor";
// import { startBattleHandler } from "./src/socket/battle/startBattleHandler";
import { actionSelectedHandler } from "./src/socket/battle/actionSelectedHandler";
import http from "node:http";
import { Server } from "socket.io";
import { Player } from "./src/model/game/player";
import { Battle } from "./src/model/game/battle";
import GameSession from "./src/model/host/gameSession";
import { gameSessionHandler } from "./src/socket/gameSessionHandler";

export const activeGameSessions = new Map<number, GameSession>();
export const players = new Map<string, Player>();
export const battles = new Map<string, Battle>();

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
    // startBattleHandler(io, socket);
    actionSelectedHandler(io, socket);
    gameSessionHandler(io, socket);

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
            message: `Player ${player?.getName()} - ${socket.id} disconnected.`,
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
