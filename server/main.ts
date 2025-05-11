import { Meteor } from "meteor/meteor";
import { startBattleHandler } from "./src/socket/battle/startBattleHandler";
import { actionSelectedHandler } from "./src/socket/battle/actionSelectedHandler";
import http from "node:http";
import { Server } from "socket.io";
import { Player } from "./src/model/game/player";
import { StonehideGuardian } from "./src/model/game/monster/stonehide_guardian";
import { Battle } from "./src/model/game/battle";

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
    socket.on("create_player", (name) => {
      let monster = new StonehideGuardian();
      let player = new Player(socket.id, name, monster);

      players.set(socket.id, player);
    });

    startBattleHandler(io, socket);
    actionSelectedHandler(io, socket);

    socket.on("disconnect", () => {
      players.delete(socket.id);
    });
  });

  server.listen(PORT, () => {});
});
