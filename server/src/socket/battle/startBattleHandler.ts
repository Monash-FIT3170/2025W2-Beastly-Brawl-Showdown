import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import GameSession from "../../model/host/gameSession";
import { BattlePhase } from "../../../../types/composite/battleState";

export default function proceedBattleTurn(io: Server, socket: Socket, gameSession: GameSession, battle: Battle) {
  // TODO: Set a property in the battle instance to object it is in the 10 sec waiting stage (for the host match summary page)
  battle.clearBattleLogs();
  battle.incTurn();

  let playersInBattle = battle.getPlayers();

  //Players' states before the turn start
  gameSession.setCurrentPhase(BattlePhase.CHOOSE_ACTION)
  socket.emit("game-session-state", {
    session: gameSession.getGameSessionState(), 
    });
  

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

      if (battle.isBattleOver()) {
        io.to(battle.getId()).emit("battle_end", battle.getWinner());
      }
      // TODO: ONLY update the current battle to be more memory efficient...
      //Players' states after the turn ends 
      gameSession.setCurrentPhase(BattlePhase.EXECUTE_ACTION)
      socket.emit("game-session-state", {
        session: gameSession.getGameSessionState(), 
        });

      // TODO: Set a 2-5 second "animation" window, and set a property in the battle instance to object it is in the animation stage (for the host match summary page)

      setTimeout(() => {

        // TODO: Set a property in the battle instance to object it is in the battle result stage (for the host match summary page)
        proceedBattleTurn(io, socket, gameSession, battle);
      }, 5000);
    }
  }, 1000); // Emit every second
}
