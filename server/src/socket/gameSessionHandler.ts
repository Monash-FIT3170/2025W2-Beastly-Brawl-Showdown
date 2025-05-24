import { Server, Socket } from "socket.io";
import { activeGameSessions, players } from "../../main";
import { Player } from "../model/game/player";
import GameSession from "../model/host/gameSession";
import proceedBattleTurn from "./battle/startBattleHandler";

export const gameSessionHandler = (io: Server, socket: Socket) => {
  // Create game session
  socket.on("create-game", ({}) => {
    console.log("Attempting game session creation...");
    const session = new GameSession(socket.id);
    // Check if game code already exists, if so, generate a new one
    while (activeGameSessions.has(session.getGameCode())) {
      console.log("Game session already exists. Generating new code...");
      session.generateGameCode();
    }
    activeGameSessions.set(session.getGameCode(), session);
    console.log(
      `Game session created: ${session.getGameCode()} | hostId: ${socket.id}`
    );
    socket.join(`game-${session.getGameCode()}`);

    socket.emit("new-game", {
      // UPDATE: change who this emits to because potentially two ppl clicking host at same time would call this
      code: session.getGameCode(),
    });
  });

  // Join request
  socket.on("join-game", ({ gameCode, name }) => {
    console.log(
      `Join request for Code: ${gameCode}, User: ${name} - ${socket.id}`
    );
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesn't exist
      console.log(`Join request failed. Invalid Code`);
      return;
    }

    const newPlayer = new Player(socket.id, name);
    if (!session.addPlayer(newPlayer)) {
      // Join request rejected
      console.log(`Player ${name} rejected from ${gameCode}`);
      // UPDATE: Include user feedback here (pop-up)
      return;
    }
    newPlayer.updateGameCode(gameCodeN);

    // Add player to players map
    players.set(socket.id, newPlayer);

    // Add player to Game Session socket
    socket.join(`game-${gameCodeN}`);

    // Update host information
    io.to(`game-${gameCode}`).emit("update-players", {
      message: `Player ${name} - ${socket.id} added to current game session.`,
      players: session.players.getItems(),
    });

    // Player is accepted
    console.log(`Join request accepted. UserID: ${socket.id}`);

    // Update player success message
    socket.emit("join-accept", {
      gameSessionId: gameCode,
    });
  });

  console.log(socket.listeners("example").length);

  // Join as host
  socket.on("host-game", ({ gameCode }) => {
    // Concept is this is called when the host's id is changed so that they're
    // added to the room without being added to player list like join-room does
    console.log(`Join request for Code: ${gameCode}, Host: ${socket.id}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesn't exist
      console.log(`Join request failed. Invalid Code`);
      return;
    }
    const oldHost = session.getHost();

    // UPDATE: Check current host of Game Session is still active
    session.updateHost(socket.id);
    console.log(
      `Old Host ${oldHost} has been replaced with ${socket.id} for game: ${gameCode}`
    );

    socket.join(`game-${gameCodeN}`);
  });

  // Leave request
  socket.on("leave-game", ({ userID = socket.id }) => {
    const gameCode = players.get(userID)?.getGameCode();
    //debugging
    if (!players.get(userID)) {
      console.log(`Player not in map.`);
    }

    console.log(`Leave request for Code: ${gameCode}, User ID: ${userID}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesnt exist
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

    // Timeout to allow message to send before kick
    setTimeout(() => {
      socketToKick.leave(`game-${gameCodeN}`);
      session.removePlayer(userID);
      players.get(userID)?.updateGameCode(0);

      console.log(`Removed player ${userID} from game session ${gameCode}`);

      // Update host information
      io.to(`game-${gameCode}`).emit("update-players", {
        message: `Player ${socket.id} removed from current game session.`,
        players: session.players.getItems(),
      });
    }, 100);
  });

  // Emits current player list on request
  socket.on("get-players", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesn't exist
      console.log(`Get Request Failed. Invalid Code ${gameCode}`);
      return;
    }
    io.to(`game-${gameCode}`).emit("update-players", {
      message: `Players Array Fetched`,
      players: session.players.getItems(),
    });
  });

  // List all active Game Session codes
  socket.on("game-list", () => {
    activeGameSessions.forEach((_session, gameCode) => {
      console.log("Game code:", gameCode);
    });
  });

  // Start game
  socket.on("start-game", ({ gameCode }) => {
    console.log(`Start request for Code: ${gameCode}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesnt exist
      console.log(`Request failed. Invalid Code`);
      return;
    }

    if (!session.canStartGame()) {
      // UPDATE: Need to change how this is returned
      console.log(`Request failed.`);
    }
    const battles = session.createMatches();

    for (const battle of session.getBattles().getItems()) {
      for (const player of battle.getPlayers()) {
        io.sockets.sockets.get(player.getId())?.join(battle.getId());
      }
      io.to(battle.getId()).emit("battle_started", battle.getId());
      proceedBattleTurn(io, battle);
    }

    // Add the battles to the socket
    // UPDATE: Add Agile Team 1 functionality
    socket.join(`game-${gameCodeN}`);

    // Update host information
    io.to(`game-${gameCode}`).emit("battles-created", {
      message: `Battles for Session ${socket.id} added to current game session.`,
      battles: session.getGameSessionState(),
    });
  });

  // Close game session
  socket.on("cancel-game", ({ gameCode }) => {
    console.log("Session cancelling...");
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesn't exist
      console.log(`Cancel Request failed. Invalid Code`);
      return;
    }

    io.to(`game-${gameCodeN}`).emit("close-warning", {
      message: "Current game session is closing.",
    });

    // Timeout to allow the message to send before closure
    setTimeout(() => {
      activeGameSessions.delete(gameCodeN);
      // Removes all clients -> should auto delete room
      io.to(`game-${gameCodeN}`).emit("kick-warning", {
        message: "Game Session has been closed.",
      });

      setTimeout(() => {
        io.in(`game-${gameCodeN}`).socketsLeave(`game-${gameCodeN}`);
      }, 100); // wait 100ms

      console.log(`Game ${gameCodeN} is cancelled.`);
    }, 100);
  });
};
