import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import GameSession from "../../model/host/gameSession";
import { BattlePhase } from "../../../../types/composite/battleState";
import { AttackAction } from "../../model/game/action/attack";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { TipTheScalesAbilityAction } from "../../model/game/action/ability/tipTheScales";
import { ActionRandomiser } from "../../model/game/actionRandomiser";


export default function proceedBattleTurn(
  io: Server,
  socket: Socket,
  gameSession: GameSession,
  battle: Battle
) {
  // TODO: Set a property in the battle instance to object it is in the 10 sec waiting stage (for the host match summary page)
  battle.clearBattleLogs();
  battle.incTurn();

  let playersInBattle = battle.getPlayers();

  // checks/ticks statuses for each player
  playersInBattle.forEach((player) => {
    player.tickStatuses();
    // let statuses = player.getStatuses();
    // statuses.forEach((status) => {
    //   status.tick(player);
    // })
  });

  if (battle.isBattleOver()) {
    const winners = battle.getWinners();
    if (winners.length == 0) {
      //if battle is over, the array length is guaranteed to be either 0 or 1
      io.to(battle.getId()).emit("battle_end", {
        result: "draw",
        winners: winners,
      });
    } else {
      io.to(battle.getId()).emit("battle_end", {
        result: "concluded",
        winners: winners,
      });
    }
  }

  //Players' states before the turn start
  gameSession.setCurrentPhase(BattlePhase.CHOOSE_ACTION);
  io.to(gameSession.getHost()).emit("game-session-state", {
    session: gameSession.getGameSessionState(),
  });

  playersInBattle.forEach((player) => {
    if (!player.isBotPlayer()){ //only emit to socket if the player is a human
      io.to(player.getId()).emit(
        "battle_state",
        battle.getBattleState(player.getId())
      ); // Emit the battle state to each player

      let actions = player.getMonster().getPossibleActionStates();
      io.to(player.getId()).emit("possible_actions", actions); // Emit the list of action names
    } else {
      ActionRandomiser.randomAction(player)
    }
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

      // Animations, For the future, we need to handle animations in a more centralised manner with no hard coding.
      // Handles the dice roll - For now, typecasting to send the damage so dice can roll it
      // TODO: For the future, actions should trigger their own animations themselves. Perhaps add a feature that emits animation type and let the
      // battle screen handle the type of animation to show
      player1.getActions().forEach((action) => {
        if (!player1.isBotPlayer()){ //only emit to socket if the player is a human
          if (action.getName() === "Attack") {
            const attackAction = action as AttackAction;
            const diceRoll = attackAction.getDiceRoll();
            io.to(player1.getId()).emit("roll_dice", diceRoll);
          }
        }

        if (action.getName() === "Tip The Scales") {
          const tipTheScalesAction = action as TipTheScalesAbilityAction;
          const diceRoll = tipTheScalesAction.getDiceRoll();
          io.to(player1.getId()).emit("roll_dice", diceRoll);
          console.log(
            `Player 1 used tip the scales and dice roll = ${diceRoll}`
          );
        }
      });

      player2.getActions().forEach((action) => {
        if (!player2.isBotPlayer()){ //only emit to socket if the player is a human
          if (action.getName() === "Attack") {
            const attackAction = action as AttackAction;
            const diceRoll = attackAction.getDiceRoll();
            io.to(player2.getId()).emit("roll_dice", diceRoll);
          }
        }

        if (action.getName() === "Tip The Scales") {
          const tipTheScalesAction = action as TipTheScalesAbilityAction;
          const diceRoll = tipTheScalesAction.getDiceRoll();
          console.log(
            `Player 2 used tip the scales and dice roll = ${diceRoll}`
          );
          io.to(player2.getId()).emit("roll_dice", diceRoll);
        }
      });

      setTimeout(() => {
        // Execute method
        let p1_result;
        let p2_result;

        //player list of actions will always be 1; hence p1_result can be used
        player1.getActions().forEach((action) => {
          p1_result = action.execute(player1, player2);
          if (action instanceof NullAction) {
            console.log(`P1 - ${player1.getName()} did nothing.`);
          }
        });

        //player list of actions will always be 1; hence p2_result can be used
        player2.getActions().forEach((action) => {
          p2_result = action.execute(player2, player1);
          if (action instanceof NullAction) {
            console.log(`P2 - ${player2.getName()} did nothing.`);
          }
        });

        console.log("P1: ", player1);

        console.log("P2: ", player2);

        //Handle logic after actions are executed (see GameMode)
        gameSession.onActionExecuted(player1.getId(), p1_result, player2.getId(), p2_result)

        // Emit the result of the battle state after the turn is complete
        playersInBattle.forEach((player) => {
          if (!player.isBotPlayer()){ // Only emit the battle state of human player
            io.to(player.getId()).emit(
            "battle_state",
            battle.getBattleState(player.getId())
          );
          }
        });

        // After results of actions are sent to the client, and client has updated its UI, need to reset the stats of player back to Monster
        playersInBattle.forEach((player) => {
          player.resetStats();
          player.resetActions();
          player.getMonster()?.removeTemporaryActions();
        });

        if (battle.isBattleOver()) {
          const winners = battle.getWinners();
          if (winners.length == 0) {
            //Handler after a battle ended
            gameSession.onBattleEnded(null,battle, io, socket)

            //if battle is over, the array length is guaranteed to be either 0 or 1
            io.to(battle.getId()).emit("battle_end", {
              result: "draw",
              winners: winners.map((player) => player.getName()),
            });
          } else {
            //Handler after a battle ended
            gameSession.onBattleEnded(winners[0], battle, io,socket)

            io.to(battle.getId()).emit("battle_end", {
              result: "concluded",
              winners: winners.map((player) => player.getName())
,
            });
          }
          
          //Emit to host one last time before shutting down the handler
          gameSession.setCurrentPhase(BattlePhase.EXECUTE_ACTION);
          io.to(gameSession.getHost()).emit("game-session-state", {
            session: gameSession.getGameSessionState(),
          });

          //Shutting down the handler
          return
        }
        // TODO: ONLY update the current battle to be more memory efficient...
        //Players' states after the turn ends
        gameSession.setCurrentPhase(BattlePhase.EXECUTE_ACTION);
        io.to(gameSession.getHost()).emit("game-session-state", {
          session: gameSession.getGameSessionState(),
        });

        //
        setTimeout(() => {
          if (gameSession.areBattlesConcluded()) {

            //Handler after all battles have ended
            // gameSession.onBattlesEnded(io, socket)

            console.log(
              `All battles are concluded in game session ${gameSession.getGameCode()}`
            );

            //TODO: for future, this can be used to handle what happens after a game session ends

            socket.emit("game_session_ended", {
              message: `Game session ${gameSession.getGameCode()} has ended.`,
            });
            return;
          }

          proceedBattleTurn(io, socket, gameSession, battle);
        }, 3000);
      }, 3000);
    }
  }, 1000); // Emit every second
}
