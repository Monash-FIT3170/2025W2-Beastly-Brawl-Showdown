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
      proceedBattleTurn(io, battle)

  }});
}


function proceedBattleTurn(io: Server, battle:Battle){
        // TODO: separate below logic into a separate function, so that it can be reused every turn
        battle.clearBattleLogs();
        battle.incTurn();
  
        let playersInBattle = battle.getPlayers();
  
        playersInBattle.forEach((player) => {
          io.to(player.getId()).emit(
            "battle_state",
            battle.getBattleState(player.getId())
          ); // Emit the battle state to each player
  
          let actions = player.getMonster().getPossibleActionStates();
          io.to(player.getId()).emit("possible_actions", actions); // Emit the list of action names
        });
  
        let player1 = playersInBattle[0];
        let player2 = playersInBattle[1];
  
        let timer = 10; // Set the initial timer value (e.g., 60 seconds)
        const interval = setInterval(() => {
          if (timer >= 0) {
            io.to(battle.getId()).emit("timer", timer);
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
  
            // Emite the result of the battle state after the turn is complete
            playersInBattle.forEach((player) => {
              io.to(player.getId()).emit(
                "battle_state",
                battle.getBattleState(player.getId())
              );
            });
  
            // After results of actions are sent to the client, and client has updated its UI, need to reset the stats of player back to Monster
            playersInBattle.forEach((player) => {
              player.resetStats();
              player.resetActions();
            });
            
            if (battle.isBattleOver()){
              io.to(battle.getId()).emit("battle_end",battle.getWinner())
            }
          
          setTimeout(() => {
            proceedBattleTurn(io, battle)
          }, 2000)
        }
    }, 1000); // Emit every second
}


