import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import GameSession from "../../model/host/gameSession";
import { BattlePhase } from "../../../../types/composite/battleState";
import { AttackAction } from "../../model/game/action/attack";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { TipTheScalesAbilityAction } from "../../model/game/action/ability/tipTheScales";
import { ActionRandomiser } from "../../model/game/actionRandomiser";
import { Player } from "../../model/game/player";

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
  //playersInBattle.forEach((player) => {
  //player.tickStatuses();
  // let statuses = player.getStatuses();
  // statuses.forEach((status) => {
  //   status.tick(player);
  // })
  //});

  if (battle.isBattleOver()) {
    const winners = battle.getWinners();
    if (winners.length == 0) {
      //if battle is over, the array length is guaranteed to be either 0 or 1
      io.to(battle.getId()).emit("battle_end", {
        result: "draw",
        winners: winners.map((player) => player.getName()),
      });
    } else {
      const winningPlayer = winners[0];
      console.log(
        `Player ${winningPlayer.getName()} added to the Waiting Queue`
      );
      io.to(battle.getId()).emit("battle_end", {
        result: "concluded",
        winners: winners.map((player) => player.getName()),
      });
    }
  }

  //Players' states before the turn start
  gameSession.setCurrentPhase(BattlePhase.CHOOSE_ACTION);
  io.to(gameSession.getHost()).emit("game-session-state", {
    session: gameSession.getGameSessionState(),
  });

  playersInBattle.forEach((player) => {
    // player.tickStatuses();
    if (!player.isBotPlayer()) {
      //only emit to socket if the player is a human
      io.to(player.getId()).emit("battle_state", {
        battle: battle.getBattleState(player.getId()),
        metadata: gameSession.getMetadata(), //metadata received from the game session
      }); // Emit the battle state to each player

      let actions = player.getMonster().getPossibleActionStates();
      io.to(player.getId()).emit("possible_actions", actions); // Emit the list of action names
    } else {
      ActionRandomiser.randomAction(player);
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

        if (player.getNoNullAction() === Player.roundToCheck) {
          const winner = battle.getPlayerWithBetterHealth();

          if (winner === null) {
            playersInBattle[0].setHealth(0);
            playersInBattle[1].setHealth(0);
          } else {
            battle.getOpponentOf(winner).setHealth(0);
          }
          return;
        }
      });

      // Prepare method
      player1.getActions().forEach((action) => {
        action.prepare(player1, player2);
      });

      player2.getActions().forEach((action) => {
        action.prepare(player2, player1);
      });

      // Prepare animations
      var player1DiceRoll = 0;
      var player2DiceRoll = 0;

      player1.getActions().forEach((action) => {
        const animationInfo = action.prepareAnimation();
        if (typeof animationInfo === "string") {
          player1.addAnimation(animationInfo.toLowerCase());
          console.log(`ADV: Animation P1 - ${animationInfo}`);
        } else {
          const [animationType, diceRoll] = animationInfo;
          player1.addAnimation(animationType.toLowerCase());
          player1DiceRoll = diceRoll;
          console.log(`ADV: Animation P1 - ${animationType}, ${diceRoll}`);
        }
      });

      player2.getActions().forEach((action) => {
        const animationInfo = action.prepareAnimation();
        if (typeof animationInfo === "string") {
          player2.addAnimation(animationInfo.toLowerCase());
          console.log(`ADV: Animation P2 - ${animationInfo}`);
        } else {
          const [animationType, diceRoll] = animationInfo;
          player2.addAnimation(animationType.toLowerCase());
          player2DiceRoll = diceRoll;
          console.log(`ADV: Animation P2 - ${animationType}, ${diceRoll}`);
        }
      });

      io.to(player1.getId()).emit("update_animation", "prepare");
      io.to(player2.getId()).emit("update_animation", "prepare");

      // Roll animations
      //TODO: add time out before dice roll
      if (player1DiceRoll > 0) {
        io.to(player1.getId()).emit("roll_dice", player1DiceRoll);
      }
      if (player2DiceRoll > 0) {
        io.to(player2.getId()).emit("roll_dice", player2DiceRoll);
      }

      setTimeout(() => {
        let p1_result;
        let p2_result;

        // Execute method
        player1.getActions().forEach((action) => {
          p1_result = action.execute(player1, player2);
          if (action instanceof NullAction) {
            console.log(`P1 - ${player1.getName()} did nothing.`);
          }
        });

        player2.getActions().forEach((action) => {
          p2_result = action.execute(player2, player1);
          if (action instanceof NullAction) {
            console.log(`P2 - ${player2.getName()} did nothing.`);
          }
        });

        console.log("P1: ", player1);

        console.log("P2: ", player2);

        //Handle logic after actions are executed (see GameMode)
        gameSession.onActionExecuted(
          player1.getId(),
          p1_result,
          player2.getId(),
          p2_result
        );

        //clear previous battlelogs
        battle.clearBattleLogs();

        // Emit the result of the battle state after the turn is complete
        playersInBattle.forEach((player) => {
          if (!player.isBotPlayer()) {
            // Only emit the battle state of human player
            io.to(player.getId()).emit("battle_state", {
              battle: battle.getBattleState(player.getId()),
              metadata: gameSession.getMetadata(),
            });
          }
        });

        // Execute animations
        io.to(player1.getId()).emit("update_animation", "execute");
        io.to(player2.getId()).emit("update_animation", "execute");
        // TODO: figure out when(if?) to go back to normal

        // After results of actions are sent to the client, and client has updated its UI, need to reset the stats of player back to Monster
        playersInBattle.forEach((player) => {
          player.resetStats();
          player.resetActions();
          player.getMonster()?.removeTemporaryActions();
          player.clearAnimations();
        });

        if (battle.isBattleOver()) {
          const winners = battle.getWinners();
          if (winners.length == 0) {
            //Handler after a battle ended
            gameSession.onBattleEnded(null, battle, io, socket);

            // if battle is over, the array length is guaranteed to be either 0 or 1
            // io.to(battle.getId()).emit("battle_end", {
            //   result: "draw",
            //   winners: winners.map((player) => player.getName()),
            // });
          } else {
            //Handler after a battle ended
            gameSession.onBattleEnded(winners[0], battle, io, socket);

            //             io.to(battle.getId()).emit("battle_end", {
            //               result: "concluded",
            //               winners: winners.map((player) => player.getName())
            // ,
            //             });
          }
          //Emit to host one last time before shutting down the handler
          gameSession.setCurrentPhase(BattlePhase.EXECUTE_ACTION);
          io.to(gameSession.getHost()).emit("game-session-state", {
            session: gameSession.getGameSessionState(),
          });

          //Shutting down the handler
          return;
        } else {
          playersInBattle.forEach((p) => {
            p.startStatusEffects();
            p.endStatusEffects();
            p.tickStatuses();
          });
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
            gameSession.onBattlesEnded(io, socket);

            console.log(`Only one player remains.`);

            //TODO: for future, this can be used to handle what happens after a game session ends

            socket.emit("game_session_ended", {
              message: `Game session ${gameSession.getGameCode()} has ended.`,
            });
            return;
          }

          if (battle.isBattleOver()) {
            console.log(`Battle ${battle.getId} has ended`);
            return;
          }

          proceedBattleTurn(io, socket, gameSession, battle);
        }, 3000);
      }, 3000);
    }
  }, 1000); // Emit every second
}
