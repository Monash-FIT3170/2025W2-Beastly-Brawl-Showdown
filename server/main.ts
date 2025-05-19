import { Meteor } from "meteor/meteor";
import { Server } from "socket.io";
import http from "http";
import Player from "./src/model/game/player";
import GameSession from "./src/model/host/gameSession";

const activeGameSessions: Map<Number, GameSession> = new Map();

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

    //create game session
    socket.on("create-game", ({}) => {
      //!!!!!!!! need to check the code doesn't already exist in activeGameSessions !!!!!!!
      //is hostUID just socket ID ? - i guess unless we are logged in.. which is not possible yet.. yippee!!
      console.log("Attempting game session creation...");
      const session = new GameSession(socket.id);
      activeGameSessions.set(session.getGameCode(), session);
      console.log(
        `Game session created: ${session.getGameCode()} | hostId: ${socket.id}`
      );

      socket.join(`game-${session.getGameCode()}`);
    });

    //join request
    socket.on("join-game", ({ gameCode, name }) => {
      console.log(`Join request for Code: ${gameCode}, User: ${name}`);

      const session = activeGameSessions.get(gameCode);
      if (!session) {
        //if session of given game code doesnt exist
        console.log(`Join request failed. Invalid Code`);
        return;
      }

      const newPlayer = new Player(socket.id, name);
      session.addPlayer(newPlayer);
      //!!! need to handle what happens if addplayer is rejected

      socket.join(`game-${gameCode}`);
      console.log(`Join request accepted. UserID: ${socket.id}`);
    });

    //list all codes
    socket.on("game-list", () => {
      activeGameSessions.forEach((session, gameCode) => {
        console.log("Game code:", gameCode);
      });
    });
  });

  //need to implement ending a game session :3

  //listening
  server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
  });
});
