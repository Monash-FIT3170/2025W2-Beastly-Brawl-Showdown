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

  console.log("[BATTLE INFO]:", battle);
  let playersInBattle = battle.getPlayers();
  let spectatorsInBattle = battle.getSpectators();

  // Let's just have the spectator spectate the first person. This can be changed later.
  let playerToSpectate = playersInBattle[0];

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
        mode: gameSession.getMode().name,
        gameCode: gameSession.getGameCode().toString(),
        finalScreen: gameSession.isSessionConcluded(),
      });
    } else {
      const winningPlayer = winners[0];
      console.log(
        `Player ${winningPlayer.getName()} added to the Waiting Queue`
      );
      io.to(battle.getId()).emit("battle_end", {
        result: "concluded",
        winners: winners.map((player) => player.getName()),
        mode: gameSession.getMode().name,
        gameCode: gameSession.getGameCode().toString(),
        finalScreen: gameSession.isSessionConcluded(),
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
        isSpectating: false,
      }); // Emit the battle state to each player

      let actions = player.getMonster().getPossibleActionStates();
      io.to(player.getId()).emit("possible_actions", actions); // Emit the list of action names
    } else {
      ActionRandomiser.randomAction(player);
    }
  });

  if (playerToSpectate) {
    spectatorsInBattle.forEach((spectator) => {
      io.to(spectator.getId()).emit("battle_state", {
        battle: battle.getBattleState(playerToSpectate.getId()),
        metadata: gameSession.getMetadata(),
        isSpectating: true,
      });

      let actions = playerToSpectate.getMonster().getPossibleActionStates();
      io.to(spectator.getId()).emit("possible_actions", actions);
    });
  }

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
          console.log("[BEFORE ADDING]:", player.getActions());
          player.addAction(new NullAction());
          console.log("[AFTER ADDING]:", player.getActions());
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

      player1.getActions().forEach((action) => {
        const animationInfo = action.prepareAnimation();
        const animationType = animationInfo[0];
        const diceRollNumber = animationInfo[1];
        console.log(`ADV: Animation P1 - ${animationType}, ${diceRollNumber}`);
        io.to(player1.getId()).emit(String(animationType), diceRollNumber);
      });

      player2.getActions().forEach((action) => {
        const animationInfo = action.prepareAnimation();
        const animationType = animationInfo[0];
        const diceRollNumber = animationInfo[1];

        console.log(`ADV: Animation P2 - ${animationType}, ${diceRollNumber}`);
        io.to(player2.getId()).emit(String(animationType), diceRollNumber);
      });

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

        console.log("[BEFORE EXECUTE]:", player1.getActions());
        console.log("[BEFORE EXECUTE]:", player2.getActions());
        console.log("[BEFORE EXECUTE]:", p1_result);
        console.log("[BEFORE EXECUTE]:", p2_result);
        console.log("Battle turn:", battle.getTurn());

        //Handle logic after actions are executed (see GameMode)
        gameSession.onActionExecuted(player1, p1_result, player2, p2_result);

        //clear previous battlelogs
        battle.clearBattleLogs();

        // Emit the result of the battle state after the turn is complete
        playersInBattle.forEach((player) => {
          if (!player.isBotPlayer()) {
            // Only emit the battle state of human player
            io.to(player.getId()).emit("battle_state", {
              battle: battle.getBattleState(player.getId()),
              metadata: gameSession.getMetadata(),
              isSpectating: false,
            });
          }
        });

        if (playerToSpectate) {
          spectatorsInBattle.forEach((spectator) => {
            io.to(spectator.getId()).emit("battle_state", {
              battle: battle.getBattleState(playerToSpectate.getId()),
              metadata: gameSession.getMetadata(),
              isSpectating: true,
            });

            let actions = playerToSpectate
              .getMonster()
              .getPossibleActionStates();
            io.to(spectator.getId()).emit("possible_actions", actions);
          });
        }

        // After results of actions are sent to the client, and client has updated its UI, need to reset the stats of player back to Monster
        playersInBattle.forEach((player) => {
          player.resetStats();
          player.resetActions();
          player.getMonster()?.removeTemporaryActions();
          player.endStatusEffects();
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
