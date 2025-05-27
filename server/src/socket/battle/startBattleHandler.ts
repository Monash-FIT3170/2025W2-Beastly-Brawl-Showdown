import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import GameSession from "../../model/host/gameSession";
import { BattlePhase } from "../../../../types/composite/battleState";
import { AttackAction } from "../../model/game/action/attack";

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

        // Handles the dice roll - For now, typecasting to send the damage so dice can roll it
        // TODO: For the future, actions should trigger their own animations themselves. Perhaps add a feature that emits animation type and let the
        // battle screen handle the type of animation to show
        if (action.getName() === "Attack") {
          const attackAction = action as AttackAction;
          const diceRoll = attackAction.getDiceRoll();
          io.to(player1.getId()).emit("roll_dice", diceRoll);
        }
      });

      player2.getActions().forEach((action) => {
        action.execute(player2, player1);

        if (action.getName() === "Attack") {
          const attackAction = action as AttackAction;
          const diceRoll = attackAction.getDiceRoll();
          io.to(player2.getId()).emit("roll_dice", diceRoll);
        }
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
        const winners = battle.getWinners()
        if (winners.length ==0){  //if battle is over, the array length is guaranteed to be either 0 or 1
          io.to(battle.getId()).emit("battle_end", {result: "draw", winners: winners})
        } else {
          io.to(battle.getId()).emit("battle_end", {result: "concluded", winners: winners});
        }
      }
      // TODO: ONLY update the current battle to be more memory efficient...
      //Players' states after the turn ends 
      gameSession.setCurrentPhase(BattlePhase.EXECUTE_ACTION)
      socket.emit("game-session-state", {
        session: gameSession.getGameSessionState(), 
        });

      // TODO: Set a 2-5 second "animation" window, and set a property in the battle instance to object it is in the animation stage (for the host match summary page)

      setTimeout(() => {
        if (gameSession.areBattlesConcluded()){
          console.log(`All battales are concluded in game session ${gameSession.getGameCode()}`)
          //TODO: for future, this can be used to handle what happens after a game session ends 
          socket.emit("game_session_ended", {
            message: `Game session ${gameSession.getGameCode()} has ended.`
          })
          return;
        }

        // TODO: Set a property in the battle instance to object it is in the battle result stage (for the host match summary page)
        proceedBattleTurn(io, socket, gameSession, battle);
      }, 5000);
    }
  }, 1000); // Emit every second
}
