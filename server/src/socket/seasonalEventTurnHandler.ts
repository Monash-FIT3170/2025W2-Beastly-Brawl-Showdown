import { Server, Socket } from "socket.io";
import { activeSeasonalEvents, players, battles, playerAccounts } from "../../main";

import { ActionState } from "/types/single/actionState";
import { NullAction } from "../model/game/action/null";
import { loadNextEventStory, loadNextStory, progressEvent } from "./seasonalEventModeHandler";
import { ActionRandomiser } from "../model/game/actionRandomiser";
import { ActionIdentifier } from "../../../types/single/actionState";
import { Action } from "../model/game/action/action";
import { Player } from "../model/game/player";

//function to show status at begining of turn 1 in a batle
function showDefaultStatusAnimations(
  io: Server,
  player1: Player,
  player2: Player
) {
  // Build status-only animations for both players
  player1.clearAnimations();
  player1.setStartStatusAnimations();

  player2.clearAnimations();
  player2.setStartStatusAnimations();

  // default phase
  io.to(player1.getId()).emit("update_animation", {
    phase: "default",
    player: player1.getAnimations().filter((a) => a !== ""),
    opp: player2.getAnimations().filter((a) => a !== ""),
  });
  io.to(player2.getId()).emit("update_animation", {
    phase: "default",
    player: player2.getAnimations().filter((a) => a !== ""),
    opp: player1.getAnimations().filter((a) => a !== ""),
  });
}

export const seasonalEventTurnHandler = (io: Server, socket: Socket) => {
  // Handle player actions in seasonal events
  socket.on(
    "event_action",
    ({ action, playerId }: { action: ActionState; playerId: string }) => {
      console.log("SEV: Attempting action addition...");

      var battle = battles.get(playerId);
      var player = battle?.getPlayer(playerId);
      var actionToAdd: Action | undefined = undefined;
      player?.clearLogs();

      //show status at begining of turn 1 battle 
      let players = battle?.getPlayers();

      if (!players) {
        console.error(`SEV: battle players empty ${players}`);
      } else{
        if (battle?.getTurn() === 0){
          showDefaultStatusAnimations(io, players[0], players[1])
        }
      }

      if (action.name == ActionIdentifier.CONSUME) {
        //CHECK IF CONSUME ACTION and just continue???
        //TODO: fix my methods because its ew just tryna get it to work lol...
        //COS ALREADY ADDED...
        console.log(`SEV: CONSUME COMSRNG CONSUME CONSUM`);
      } else {
        actionToAdd = player?.getMonster()?.getAction(action.id);
        //ADDING ACTION TO PLAYER
        if (actionToAdd) {
          player?.addAction(actionToAdd);
          console.log(
            `SEV: Adding action ${actionToAdd.getName()} to Player ${player?.getName()}`
          );
          console.log(actionToAdd.getDescription());
        } else {
          console.error(
            `Battle: ${playerId}, ${battle} \n Player: ${playerId}, ${player} \n Action: ${action.id}, ${actionToAdd}`
          );
        }
      }

      //PREPARE/EXECUTE ACTIONS
      let playersInBattle = battle?.getPlayers();
      if (!playersInBattle) {
        console.error(`SEV: battle players empty ${playersInBattle}`);
      } else {
        //ADDING ACTION TO BOT
        let player1 = playersInBattle[0];
        let player2 = playersInBattle[1];
        let bot = player2.isBotPlayer() ? player2 : player1;
        ActionRandomiser.randomAction(bot);

        //if no selected action -> null action (this is a failsafe in case bot broken)
        playersInBattle.forEach((p) => {
          if (p.getActions().length === 0) {
            p.addAction(new NullAction());
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
            console.log(`SEV: Animation P1 - ${animationInfo}`);
          } else {
            const [animationType, diceRoll] = animationInfo;
            player1.addAnimation(animationType.toLowerCase());
            player1DiceRoll = diceRoll;
            console.log(`SEV: Animation P1 - ${animationType}, ${diceRoll}`);
          }
        });

        player2.getActions().forEach((action) => {
          const animationInfo = action.prepareAnimation();
          if (typeof animationInfo === "string") {
            player2.addAnimation(animationInfo.toLowerCase());
            console.log(`SEV: Animation P2 - ${animationInfo}`);
          } else {
            const [animationType, diceRoll] = animationInfo;
            player2.addAnimation(animationType.toLowerCase());
            player2DiceRoll = diceRoll;
            console.log(`SEV: Animation P2 - ${animationType}, ${diceRoll}`);
          }
        });

        //add statuses to animation.
        player1.setStartStatusAnimations();
        player2.setStartStatusAnimations();

        //update battlestate
        io.to(playerId).emit("event_state", {
          type: "battle",
          battle: battle?.getBattleState(playerId),
        });

        //FIXME: consider not emitting to two "sockets" as adventure only has one!
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

        

        //TIME OUT CONSTANTS
        const prepareTimeOut = 1000; // -> between prepare animation and roll animation
        const rollTimeOut = 2000; // -> between prepare/roll and execute animation
        const executeTimeOut = 3000; // -> between execute and next turn/default animation

        // TIME OUT BETWEEN PREPARE AND ROLL
        setTimeout(() => {
          // Roll animations
          if (player1DiceRoll > 0) {
            io.to(player1.getId()).emit("roll_dice", player1DiceRoll);
          }
          if (player2DiceRoll > 0) {
            io.to(player2.getId()).emit("roll_dice", player2DiceRoll);
          }
          //TODO: update battle footer to display animation stage if we want?
          // Remove possible actions essentially hiding the battle footer until animations and calculations are done.
          io.to(playerId).emit("possible_actions", []);

          //TIME OUT BETWEEN PREPARE/ROLL AND EXECUTE
          setTimeout(() => {
            player1.clearAnimations();
            player2.clearAnimations();

            // Execute method
            player1.getActions().forEach((action) => {
              action.execute(player1, player2);
              if (action instanceof NullAction) {
                //TODO: why doesn't this just exist in null action?
                console.log(`P1 - ${player1.getName()} did nothing.`);
              }
            });

            player2.getActions().forEach((action) => {
              action.execute(player2, player1);
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

            //update battlestate
            io.to(playerId).emit("event_state", {
              type: "battle",
              battle: battle?.getBattleState(playerId),
            });

            console.log(
              "[EXECUTE] p1:",
              player1.getAnimations(),
              " | p2:",
              player2.getAnimations()
            );
            // Execute animations
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

            //reset players
            playersInBattle.forEach((p) => {
              p.clearAnimations();
              p.resetStats();
              p.resetActions();
              p.getMonster()?.removeTemporaryActions();
              p.tickStatuses();
              p.startStatusEffects();
              p.setStartStatusAnimations(); //always see stunned etc.
            });

            //update battlestate
            io.to(playerId).emit("event_state", {
              type: "battle",
              battle: battle?.getBattleState(playerId),
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


              //check if battle is over
              if (battle?.isBattleOver()) {
                const winners = battle
                  .getWinners()
                  ?.map((player) => player.getName());
                console.log("SEV: Battle over! Winners:", winners);
                const playerName = player?.getName();
                if (playerName) {
                  player?.getStatuses().forEach((status) => {
                    status.endOfBattle(player);
                  });
                  //if the winner is the player
                  if (winners?.includes(playerName)) {
                    console.log(`SEV: player won!`);
                    const seasonalEvent = activeSeasonalEvents.get(playerId);
                    const stage = seasonalEvent?.getStage();
                    console.log("stage: ", stage);
                    // console.log("adventure", adventure);
                    if (seasonalEvent && stage) {
                      // Get current story node and outcome
                      const outcome = loadNextEventStory(io, seasonalEvent, socket);

                      // If outcome has a next, update currentOutcomeId
                      if (outcome && outcome.next) {
                        seasonalEvent.currentOutcomeId = outcome.next;
                        seasonalEvent.pastEncounters.push(
                          seasonalEvent.currentOutcomeId
                        );
                      } else {
                        seasonalEvent.currentOutcomeId = null;
                        seasonalEvent.currentStory = null; // Or handle end of adventure
                      }
                      console.log("outcome", outcome);
                      console.log("outcome.next", outcome?.next);
                      seasonalEvent.getPlayer().clearLogs();
                      progressEvent(io, socket, seasonalEvent, stage);
                    } else {
                      console.error(
                        `SEV: event  or stage does not exist for player id: ${playerId} \n
                        ${seasonalEvent}, ${stage}`
                      );
                    }
                  } else {
                    console.log(`SEV: GAME OVER!`);
                    socket.emit("event_defeat");
                    const seasonalEvent = activeSeasonalEvents.get(playerId);

                    //update endless high score
                    if (seasonalEvent?.getLevel() === 0) {
                      const user = playerAccounts.get(socket.id);
                      var adventureProgression = user?.adventureProgression;
                      if (adventureProgression) {
                        const oldRecord = adventureProgression.stage;
                        if (seasonalEvent.getStage() > oldRecord) {
                          adventureProgression.stage = seasonalEvent.getStage();
                        }
                      } else {
                        console.error(
                          `SEV: Failed to load ${user?._id}'s endless record.`
                        );
                      }
                    }
                  }
                } else {
                  console.error(
                    `SEV: Player does not have name. ${playerName}`
                  );
                }
              } else {
                //if battle not over - prepare next turn
                let actions = player?.getMonster()?.getPossibleActionStates();
                io.to(playerId).emit("possible_actions", actions);  
                battle?.incTurn();
              }
            }, executeTimeOut);
          }, rollTimeOut);
        }, prepareTimeOut);
      }
    }
  );
};