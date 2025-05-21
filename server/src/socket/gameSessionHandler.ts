import { Server, Socket } from "socket.io";
import { activeGameSessions, players } from "../../main";
import Player from "../model/game/player";
import Battle from "../model/game/battle";
import GameSession from "../model/host/gameSession";

//todo: need to update all console logs to be "emit" so that clients can react accordingly
//todo: update players gamecode as they join/leave session

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

    socket.emit("new-game", {
      //change who this emits to because potentially two ppl clicking host at same time would call this
      code: session.getGameCode(),
    });
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
    players.set(socket.id, newPlayer);
    session.addPlayer(newPlayer);
    newPlayer.updateGameCode(gameCode);
    //!!! need to handle what happens if addplayer is rejected

    //add player to game socket
    socket.join(`game-${gameCodeN}`);

    //update host information
    io.to(`game-${gameCode}`).emit("update-players", {
      message: `Player ${name} - ${socket.id} added to current game session.`,
      players: session.players.getItems(),
    });
    // const hostSocket = io.sockets.sockets.get(session.hostUID);
    // if (!hostSocket) {
    //   console.log(`Host UID not setup properly.${session.hostUID}`);
    //   return;
    // }
    // hostSocket.emit("player-join", {
    //   message: `Player ${name} - ${socket.id} added to current game session.`,
    //   players: session.players.getItems(),
    // });

    //accepted
    console.log(`Join request accepted. UserID: ${socket.id}`);
  });

  //join as host
  socket.on("host-game", ({ gameCode }) => {
    //concept is this is called when the host's id is changed so that they're
    // added to the room without being added to player list like join-room does
    console.log(`Join request for Code: ${gameCode}, Host: ${socket.id}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      //if session of given game code doesnt exist
      console.log(`Join request failed. Invalid Code`);
      return;
    }
    const oldHost = session.getHost();

    //if oldHost is not in `game-${gameCodeN} then:
    //for now i just dgaf cos idk how to check
    //more theory around this is to block someone from overriding the current host,
    //just overriding the old socket
    //wil need a pop up for that like "Someone's already hosting this code loser ;3"
    session.updateHost(socket.id);
    console.log(
      `Old Host ${oldHost} has been replaced with ${socket.id} for game: ${gameCode}`
    );

    socket.join(`game-${gameCodeN}`);
  });

  //leave request
  socket.on("leave-game", ({ userID = socket.id }) => {
    const gameCode = players.get(userID)?.getGameCode();
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
      players.get(userID)?.updateGameCode(0);

      console.log(`Removed player ${userID} from game session ${gameCode}`);

      //update host information
      io.to(`game-${gameCode}`).emit("update-players", {
        message: `Player ${socket.id} removed from current game session.`,
        players: session.players.getItems(),
      });
    }, 100);
  });

  //give players
  socket.on("get-players", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      //if session of given game code doesnt exist
      console.log(`Get Request Failed. Invalid Code ${gameCode}`);
      return;
    }
    io.to(`game-${gameCode}`).emit("update-players", {
      message: `Players Array Fetched`,
      players: session.players.getItems(),
    });
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
    const battles = session.createMatches();

    // Add the battles to the socket
    socket.join(`game-${gameCodeN}`);

    console.log(`Battles Created. They are Below:`);
    const battlesSize = battles.size();
    for (let i = 0; i < battlesSize; i++) {
      const battle = battles.dequeue();
      if (battle != undefined) {
        console.log(`Players in Battle ${i}: ${battle.player1Name} vs ${battle.player2Name}`);
        battles.enqueue(battle);
      }
    }

    // update host information
    const hostSocket = io.sockets.sockets.get(session.hostUID);
    if (!hostSocket) {
      console.log(`Host UID not setup properly.${session.hostUID}`);
      return;
    }
    hostSocket.emit("battles-created", {
      message: `Battles for Session ${socket.id} added to current game session.`,
      battles: session.battles.getItems(),
    });
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
