import { Meteor } from "meteor/meteor";
import { actionSelectedHandler } from "./src/socket/battle/actionSelectedHandler";
import { characterSelectHandler } from "./src/socket/battle/characterSelectHandler";
import http, { get } from "node:http";
import { Server } from "socket.io";
import { Player } from "./src/model/game/player";
import { Battle } from "./src/model/game/battle";
import GameSession from "./src/model/host/gameSession";
import { gameSessionHandler } from "./src/socket/gameSessionHandler";
import { waitingScreenDataHandler } from "./src/socket/battle/waitingScreenDataHandler";

export const players = new Map<string, Player>();
export const battles = new Map<string, Battle>();
export const activeGameSessions = new Map<number, GameSession>();
import { insertNewPlayerAccount, getPlayerData, deletePlayerAccount } from "./src/database/dbManager";
import { registerHandler } from "./src/socket/backend/registerHandler";
import { loginHandler } from "./src/socket/backend/loginHandler";
import { register } from "node:module";


Meteor.startup(async () => {
  console.log("MONGO_URL:", process.env.MONGO_URL); // Testing for database connection

  // Initialise socket
  const server = http.createServer();
  const PORT = 3002;
  const allowedOrigins = Meteor.settings.public.SERVER_URLS;

  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        console.log("CORS request from:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed origin by CORS"));
        }
      },
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // startBattleHandler(io, socket);
    console.log(`Client connected: ${socket.id}`);
    // for refresh
    socket.emit("new-connect", {});
    // handlers
    loginHandler(io,socket);
    registerHandler(io,socket)
    actionSelectedHandler(io, socket);
    gameSessionHandler(io, socket);
    characterSelectHandler(io, socket);
    waitingScreenDataHandler(io, socket);

    // deletePlayerAccount("asd@gmail.com")

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
            players: session.getPlayerStates(),
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
