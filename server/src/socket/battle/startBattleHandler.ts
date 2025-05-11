import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import { players, battles } from "../../../main";

export const startBattleHandler = (io: Server, socket: Socket) => {
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
        let actions = player.getMonster().getPossibleActionStates();
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
};
