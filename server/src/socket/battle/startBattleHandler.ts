import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import GameSession from "../../model/host/gameSession";
import { BattlePhase } from "../../../../types/composite/battleState";
import { ActionRandomiser } from "../../model/game/actionRandomiser";
import { Player } from "../../model/game/player";
import { ActionResult } from "../../../../types/single/actionState";

export default function proceedBattleTurn(
  io: Server,
  socket: Socket,
  gameSession: GameSession,
  battle: Battle
) {
  gameSession.onTurnStarted(gameSession, battle, io, socket);

  // TODO: Set a property in the battle instance to object it is in the 10 sec waiting stage (for the host match summary page)
  let timer = 10;
  battle.clearBattleLogs();
  battle.incTurn();

  console.log("[BATTLE INFO]:", battle);
  console.log("[BATTLE INFO]:", battle);
  let playersInBattle = battle.getPlayers();
  let spectatorsInBattle = battle.getSpectators();

  //check if end of battle
  if (battle.isBattleOver()) {
    const winners = battle.getWinners();
    if (winners.length == 0) {
      //if battle is over, the array length is guaranteed to be either 0 or 1
      io.to(`${battle.getId()}-players`).emit("battle_end", {
        result: "draw",
        winners: winners.map((player) => player.getName()),
        mode: gameSession.getMode(),
        gameCode: gameSession.getGameCode().toString(),
        finalScreen: gameSession.isSessionConcluded(),
      });

      io.to(`${battle.getId()}-spectators`).emit("spectator_battle_end", {
        gameCode: gameSession.getGameCode().toString(),
        mode: gameSession.getMode(),
        finalScreen: gameSession.isSessionConcluded(),
      });
    } else {
      const winningPlayer = winners[0];
      console.log(
        `Player ${winningPlayer.getName()} added to the Waiting Queue`
      );
      io.to(`${battle.getId()}-players`).emit("battle_end", {
        result: "concluded",
        winners: winners.map((player) => player.getName()),
        mode: gameSession.getMode(),
        gameCode: gameSession.getGameCode().toString(),
        finalScreen: gameSession.isSessionConcluded(),
      });

      io.to(`${battle.getId()}-spectators`).emit("spectator_battle_end", {
        gameCode: gameSession.getGameCode().toString(),
        mode: gameSession.getMode(),
        finalScreen: gameSession.isSessionConcluded(),
      });
    }
  }

  //clear previous battlelogs
  battle.clearBattleLogs();

  //Players' states before the turn start
  gameSession.setCurrentPhase(BattlePhase.CHOOSE_ACTION);
  io.to(gameSession.getHost()).emit("game-session-state", {
    session: gameSession.getGameSessionState(),
  });

  playersInBattle.forEach((player) => {
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

  let player1 = playersInBattle[0];
  let player2 = playersInBattle[1];

  spectatorsInBattle.forEach((spectator) => {
    const isSpecPlayer1 = player1.getPotentialSpectators().includes(spectator);
    const playerToSpectate = isSpecPlayer1 ? player1 : player2;

    io.to(spectator.getId()).emit("battle_state", {
      battle: battle.getBattleState(playerToSpectate.getId()),
      metadata: gameSession.getMetadata(),
      isSpectating: true,
    });

    let actions = playerToSpectate.getMonster().getPossibleActionStates();
    io.to(spectator.getId()).emit("possible_actions", actions);
  });

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

      //add statuses to animation.
      player1.setStartStatusAnimations();
      player2.setStartStatusAnimations();

      //TODO: update battle state?

      console.log(
        "[PREPARE] p1:",
        player1.getAnimations(),
        " | p2:",
        player2.getAnimations()
      );

      io.to(player1.getId()).emit("update_animation", {
        phase: "prepare",
        player: player1.getAnimations().filter((a) => a != ""),
        opp: player2.getAnimations().filter((a) => a != ""),
      });
      io.to(player2.getId()).emit("update_animation", {
        phase: "prepare",
        player: player2.getAnimations().filter((a) => a != ""),
        opp: player1.getAnimations().filter((a) => a != ""),
      });
      spectatorsInBattle.forEach((spectator) => {
        io.to(spectator.getId()).emit("update_animation", {
          phase: "prepare",
          player: player1.getAnimations().filter((a) => a != ""),
          opp: player2.getAnimations().filter((a) => a != ""),
        });
      });

      //TIME OUT CONSTANTS
      const prepareTimeOut = 1000; // -> between prepare animation and roll animation
      const rollTimeOut = 2000; // -> between prepare/roll and execute animation
      const executeTimeOut = 3000; // -> between execute and next turn/default animation

      // TIME OUT BETWEEN PREPARE AND ROLL
      setTimeout(() => {
        if (player1DiceRoll > 0) {
          io.to(player1.getId()).emit("roll_dice", player1DiceRoll);

          spectatorsInBattle.forEach((spectator) => {
            io.to(spectator.getId()).emit("roll_dice", player1DiceRoll);
          });
        }
        if (player2DiceRoll > 0) {
          io.to(player2.getId()).emit("roll_dice", player2DiceRoll);
        }

        // TIME OUT BETWEEN PREPARE/ROLL AND EXECUTE
        setTimeout(() => {
          player1.clearAnimations();
          player2.clearAnimations();

          const defaultActionResult: ActionResult = {
            appliedStatus: {
              success: false,
            },
            damageDealt: {
              damage: 0,
              message: "",
            },
            usedAbility: {
              isAbility: false,
              message: "",
            },
          };

          let p1_result: ActionResult = { ...defaultActionResult };
          let p2_result: ActionResult = { ...defaultActionResult };

          // Execute method
          player1.getActions().forEach((action) => {
            p1_result = action.execute(player1, player2);
            if (action instanceof NullAction) {
              //TODO: why doesn't this just exist in null action?
              console.log(`P1 - ${player1.getName()} did nothing.`);
            }
          });

          player2.getActions().forEach((action) => {
            p2_result = action.execute(player2, player1);
            if (action instanceof NullAction) {
              //TODO: why doesn't this just exist in null action?
              console.log(`P2 - ${player2.getName()} did nothing.`);
            }
          });

          //add statuses to animation.
          player1.setStartStatusAnimations();
          player1.setEndStatusAnimations();
          player2.setStartStatusAnimations();
          player2.setEndStatusAnimations();
          //battle effect handled in effect()
          player1.endStatusEffects();
          player2.endStatusEffects();

          console.log(
            "[EXECUTE] p1:",
            player1.getAnimations(),
            " | p2:",
            player2.getAnimations()
          );

          //Handle logic after actions are executed (see GameMode)
          gameSession.onActionExecuted(player1, p1_result, player2, p2_result);

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

          spectatorsInBattle.forEach((spectator) => {
            const isSpecPlayer1 = player1.getPotentialSpectators().includes(spectator);
            const playerToSpectate = isSpecPlayer1 ? player1 : player2;

            io.to(spectator.getId()).emit("battle_state", {
              battle: battle.getBattleState(playerToSpectate.getId()),
              metadata: gameSession.getMetadata(),
              isSpectating: true,
            });
          });

          io.to(player1.getId()).emit("update_animation", {
            phase: "execute",
            player: player1.getAnimations().filter((a) => a != ""),
            opp: player2.getAnimations().filter((a) => a != ""),
          });
          io.to(player2.getId()).emit("update_animation", {
            phase: "execute",
            player: player2.getAnimations().filter((a) => a != ""),
            opp: player1.getAnimations().filter((a) => a != ""),
          });

          spectatorsInBattle.forEach((spectator) => {
            io.to(spectator.getId()).emit("update_animation", {
              phase: "execute",
              player: player1.getAnimations().filter((a) => a != ""),
              opp: player2.getAnimations().filter((a) => a != ""),
            });
          });

          // After results of actions are sent to the client, and client has updated its UI, need to reset the stats of player back to Monster
          playersInBattle.forEach((p) => {
            p.clearAnimations();
            p.resetStats();
            p.resetActions();
            p.getMonster()?.removeTemporaryActions();
            p.tickStatuses();
            p.startStatusEffects();
            p.setStartStatusAnimations();
          });

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

          spectatorsInBattle.forEach((spectator) => {
            io.to(spectator.getId()).emit("battle_state", {
              battle: battle.getBattleState(player1.getId()),
              metadata: gameSession.getMetadata(),
              isSpectating: true,
            });
          });

          // TODO: ONLY update the current battle to be more memory efficient...
          //Players' states after the turn ends
          gameSession.setCurrentPhase(BattlePhase.EXECUTE_ACTION);
          io.to(gameSession.getHost()).emit("game-session-state", {
            session: gameSession.getGameSessionState(),
          });

          //TIMEOUT BETWEEN EXECUTE AND DEFAULT
          setTimeout(() => {
            io.to(player1.getId()).emit("update_animation", {
              phase: "default",
              player: player1.getAnimations(),
              opp: player2.getAnimations(),
            });
            io.to(player2.getId()).emit("update_animation", {
              phase: "default",
              player: player2.getAnimations(),
              opp: player1.getAnimations(),
            });

            spectatorsInBattle.forEach((spectator) => {
              io.to(spectator.getId()).emit("update_animation", {
                phase: "default",
                player: player1.getAnimations(),
                opp: player2.getAnimations(),
              });
            });

            if (battle.isBattleOver()) {
              const winners = battle.getWinners();
              if (winners?.length == 0) {
                //Handler after a battle ended
                gameSession.onBattleEnded(null, battle, io, socket);
                //if battle is over, the array length is guaranteed to be either 0 or 1
                io.to(`${battle.getId()}-players`).emit("battle_end", {
                  result: "draw",
                  winners: winners.map((player) => player.getName()),
                  mode: gameSession.getMode(),
                  gameCode: gameSession.getGameCode().toString(),
                  finalScreen: gameSession.isSessionConcluded(),
                });

                io.to(`${battle.getId()}-spectators`).emit(
                  "spectator_battle_end",
                  {
                    gameCode: gameSession.getGameCode().toString(),
                    mode: gameSession.getMode(),
                    finalScreen: gameSession.isSessionConcluded(),
                  }
                );
              } else {
                //Handler after a battle ended
                gameSession.onBattleEnded(winners[0], battle, io, socket);

                const winningPlayer = winners[0];
                console.log(
                  `Player ${winningPlayer.getName()} added to the Waiting Queue`
                );
                io.to(`${battle.getId()}-players`).emit("battle_end", {
                  result: "concluded",
                  winners: winners.map((player) => player.getName()),
                  mode: gameSession.getMode(),
                  gameCode: gameSession.getGameCode().toString(),
                  finalScreen: gameSession.isSessionConcluded(),
                });

                io.to(`${battle.getId()}-spectators`).emit(
                  "spectator_battle_end",
                  {
                    gameCode: gameSession.getGameCode().toString(),
                    mode: gameSession.getMode(),
                    finalScreen: gameSession.isSessionConcluded(),
                  }
                );
              }

              //Emit to host one last time before shutting down the handler
              gameSession.setCurrentPhase(BattlePhase.EXECUTE_ACTION);
              io.to(gameSession.getHost()).emit("game-session-state", {
                session: gameSession.getGameSessionState(),
              });

              //Shutting down the handler
              console.log(`Battle ${battle.getId} has ended`);

              if (gameSession.areBattlesConcluded()) {
                //Handler after all battles have ended
                // gameSession.onBattlesEnded(io, socket);

                console.log(`Only one player remains.`);

                //TODO: for future, this can be used to handle what happens after a game session ends

                socket.emit("game_session_ended", {
                  message: `Game session ${gameSession.getGameCode()} has ended.`,
                });
              }
              return;
            } else {
              proceedBattleTurn(io, socket, gameSession, battle);
            }
          }, executeTimeOut);
        }, rollTimeOut);
      }, prepareTimeOut);
    }
  }, 1000); // Emit every second
}
