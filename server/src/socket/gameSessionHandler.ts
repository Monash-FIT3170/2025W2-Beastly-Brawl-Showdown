import { Server, Socket } from "socket.io";
import { activeGameSessions } from "../../main";
import Player from "../model/game/player";
import GameSession from "../model/host/gameSession";

//todo: need to update all console logs to be "emit" so that clients can react accordingly

export const gameSessionHandler = (io: Server, socket: Socket) => {
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
    setTimeout(() => {
      socket.emit("new-game", {
        code: session.getGameCode(),
      });
    }, 100);
  });

  //join request
  socket.on("join-game", ({ gameCode, name }) => {
    console.log(
      `Join request for Code: ${gameCode}, User: ${name} - ${socket.id}`
    );
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      //if session of given game code doesnt exist
      console.log(`Join request failed. Invalid Code`);
      return;
    }

    const newPlayer = new Player(socket.id, name);
    session.addPlayer(newPlayer);
    //!!! need to handle what happens if addplayer is rejected

    //add player to game socket
    socket.join(`game-${gameCodeN}`);

    //update host information
    const hostSocket = io.sockets.sockets.get(session.hostUID);
    if (!hostSocket) {
      console.log(`Host UID not setup properly.${session.hostUID}`);
      return;
    }
    hostSocket.emit("player-join", {
      message: `Player ${name} - ${socket.id} added to current game session.`,
      players: session.players.getItems(),
    });

    //accepted
    console.log(`Join request accepted. UserID: ${socket.id}`);
  });

  //leave request
  socket.on("leave-game", ({ gameCode, userID = socket.id }) => {
    console.log(`Leave request for Code: ${gameCode}, User ID: ${userID}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      //if session of given game code doesnt exist
      console.log(`Leave request failed. Invalid Code`);
      return;
    }

    const socketToKick = io.sockets.sockets.get(userID);

    if (!socketToKick) {
      console.log(`Leave request failed. Invalid User ID`);
      return;
    }

    socketToKick.emit("kick-warning", {
      message: "You are being removed from the game session.",
    });

    //timeout to allow message to send before kick
    setTimeout(() => {
      socketToKick.leave(`game-${gameCodeN}`);
      session.removePlayer(userID);
      console.log(`Removed player ${userID} from game session ${gameCode}`);

      //update host information
      const hostSocket = io.sockets.sockets.get(session.hostUID);
      if (!hostSocket) {
        console.log(`Host UID not setup properly.${session.hostUID}`);
        return;
      }
      hostSocket.emit("player-join", {
        message: `Player ${socket.id} removed from current game session.`,
        players: session.players.getItems(),
      });
    }, 100);
  });

  //list all codes
  socket.on("game-list", () => {
    activeGameSessions.forEach((_session, gameCode) => {
      console.log("Game code:", gameCode);
    });
  });

  //start game
  socket.on("start-game", ({ gameCode }) => {
    console.log(`Start request for Code: ${gameCode}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      //if session of given game code doesnt exist
      console.log(`Request failed. Invalid Code`);
      return;
    }

    if (!session.canStartGame()) {
      //need to change how this is returned
      console.log(`Request failed.`);
    }
    //start game...
    // i guess create matches then send all players to the battle sockets?
  });

  //close game session
  socket.on("cancel-game", ({ gameCode }) => {
    console.log("Session cancelling...");
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      //if session of given game code doesnt exist
      console.log(`Cancel Request failed. Invalid Code`);
      return;
    }

    io.to(`game-${gameCodeN}`).emit("close-warning", {
      message: "Current game session is closing.",
    });
    //timeout to allow the message to send before closure
    setTimeout(() => {
      activeGameSessions.delete(gameCodeN);
      //removes all clients -> should auto delete room
      io.in(`game-${gameCodeN}`).socketsLeave(`game-${gameCodeN}`);
      console.log(`Game ${gameCodeN} is cancelled.`);
    }, 100);
  });
};
