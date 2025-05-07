import { Meteor } from "meteor/meteor";
import { startBattle } from "./src/socket/battle";
import http from "node:http";
import { Server } from "socket.io";
import { Player } from "./src/model/game/player";
import { FakeBattle } from "./src/model/game/fakebattle";
import { StonehideGuardian } from "./src/model/game/monster/stonehide_guardian";
import { Battle } from "./src/model/game/battle";
import { NullAction } from "./src/model/game/action/null";

var players = new Map<string, Player>();
let battles = new Map<string, Battle>();

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
    // TODO: Pla

    socket.on("create_player", (name) => {
      let monster = new StonehideGuardian();
      let player = new Player(socket.id, name, monster);

      players.set(socket.id, player);
    });

    socket.on("start_battle", () => {
      if (players.size == 2) {
        let playersList = Array.from(players.values());

        let battleId = crypto.randomUUID();

        let battle = new Battle(battleId, playersList[0], playersList[1]);

        battles.set(battleId, battle);

        playersList.forEach((player) => {
          io.sockets.sockets.get(player.getId())?.join(battleId);
        });

        io.to(battleId).emit("battle_started", battleId);

        // TODO: separate below logic into a separate function, so that it can be reused every turn

        let playersInBattle = battle.getPlayers();

        playersInBattle.forEach((player) => {
          let actions = player
            .getMonster()
            .getPossibleActions()
            .map((action) => action.getName()); // Map actions to their names
          io.to(player.getId()).emit("possible_actions", actions); // Emit the list of action names
        });

        let player1 = playersInBattle[0];
        let player2 = playersInBattle[1];

        let timer = 10; // Set the initial timer value (e.g., 60 seconds)
        const interval = setInterval(() => {
          if (timer >= 0) {
            io.to(battleId).emit("timer", timer);
            timer--;
          } else {
            // Turn is over, conduct the "battle" logic
            clearInterval(interval);

            // Check each player in battle has a selected action
            playersInBattle.forEach((player) => {
              if (player.getActions().length === 0) {
                player.addAction(new NullAction());
              }
            });

            // Prepare method
            player1.getActions().forEach((action) => {
              action.prepare(player1, player2);
            });

            player2.getActions().forEach((action) => {
              action.prepare(player2, player1);
            });

            // Execute method
            player1.getActions().forEach((action) => {
              action.execute(player1, player2);
            });

            player2.getActions().forEach((action) => {
              action.execute(player2, player1);
            });

            console.log("P1: ", player1);

            console.log("P2: ", player2);

            // TODO: emit the results of the actions back to the client

            // TODO: After results of actions are sent to the client, and client has updated its UI, need to reset the stats of player back to Monster
          }
        }, 1000); // Emit every second
      } else {
        console.log("Not enough players");
      }
    });

    // Listen for the 'action_selected' event from the client
    socket.on("action_selected", ({ action, battleId, playerId }) => {
      console.log(
        `Action received: ${action} for battleId: ${battleId} for playerId: ${playerId}`
      );

      var battle = battles.get(battleId);

      var player = battle?.getPlayer(playerId);

      var actionToAdd = player?.getMonster().getAction(action);

      if (actionToAdd) {
        player?.addAction(actionToAdd);
        console.log("Adding action", actionToAdd);
      }
    });

    socket.on("disconnect", () => {
      players.delete(socket.id);
    });
  });

  server.listen(PORT, () => {});
});
