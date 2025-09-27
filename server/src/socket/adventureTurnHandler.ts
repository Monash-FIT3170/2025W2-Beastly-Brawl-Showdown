import { Server, Socket } from "socket.io";
import { activeAdventures, players, battles } from "../../main";
import { ActionState } from "/types/single/actionState";
import { NullAction } from "../model/game/action/null";
import { loadNextStory, progressAdventure } from "./adventureModeHandler";
import { ActionRandomiser } from "../model/game/actionRandomiser";
import { ActionIdentifier } from "../../../types/single/actionState";
import { Action } from "../model/game/action/action";

export const adventureTurnHandler = (io: Server, socket: Socket) => {
  // Handle player actions in adventure
  socket.on(
    "adventure_action",
    ({ action, playerId }: { action: ActionState; playerId: string }) => {
      console.log("ADV: Attempting action addition...");

      var battle = battles.get(playerId);
      var player = battle?.getPlayer(playerId);
      var actionToAdd: Action | undefined = undefined;
      player?.clearLogs();
      if (action.name == ActionIdentifier.CONSUME) {
        //CHECK IF CONSUME ACTION and just continue???
        //TODO: fix my methods because its ew just tryna get it to work lol...
        //COS ALREADY ADDED...
        console.log(`ADV: CONSUME COMSRNG CONSUME CONSUM`);
      } else {
        actionToAdd = player?.getMonster()?.getAction(action.id);
        //ADDING ACTION TO PLAYER
        if (actionToAdd) {
          player?.addAction(actionToAdd);
          console.log(
            `ADV: Adding action ${actionToAdd.getName()} to Player ${player?.getName()}`
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
        console.error(`ADV: battle players empty ${playersInBattle}`);
      } else {
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
        player1.setEndStatusAnimations();

        //update battlestate
        io.to(playerId).emit("adventure_state", {
          type: "battle",
          battle: battle?.getBattleState(playerId),
        });

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

        // TIME OUT BETWEEN PREPARE AND ROLL = 1000
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

          //TIME OUT BETWEEN PREPARE/ROLL AND EXECUTE = 2000 + (1000)
          setTimeout(() => {
            player1.clearAnimations();
            player2.clearAnimations();

            // Execute method
            player1.getActions().forEach((action) => {
              action.execute(player1, player2);
              if (action instanceof NullAction) {
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

            //update battlestate
            io.to(playerId).emit("adventure_state", {
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
              player: player1.getAnimations(),
              opp: player2.getAnimations(),
            });
            io.to(player2.getId()).emit("update_animation", {
              phase: "execute",
              player: player2.getAnimations(),
              opp: player1.getAnimations(),
            });
            // TODO: figure out when(if?) to go back to normal

            //reset stats
            playersInBattle.forEach((p) => {
              p.resetStats();
              p.resetActions();
              p.getMonster()?.removeTemporaryActions();
              p.endStatusEffects();
              p.tickStatuses();
              p.startStatusEffects();
              p.clearAnimations();
              p.setStartStatusAnimations(); //always see stunned etc.
            });

            //update battlestate
            io.to(playerId).emit("adventure_state", {
              type: "battle",
              battle: battle?.getBattleState(playerId),
            });

            //TIMEOUT BETWEEN EXECUTE AND DEFAULT = 3000
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
                console.log(`ADV: battle is over!`);
                const winners = battle
                  .getWinners()
                  ?.map((player) => player.getName());
                console.log(winners);
                const playerName = player?.getName();
                if (playerName) {
                  //if the winner is the player
                  if (winners?.includes(playerName)) {
                    console.log(`ADV: player won!`);
                    const adventure = activeAdventures.get(playerId);
                    const stage = adventure?.getStage();
                    console.log("stage: ", stage);
                    // console.log("adventure", adventure);
                    if (adventure && stage) {
                      // Get current story node and outcome

                      const outcome = loadNextStory(io, adventure, socket);

                      // If outcome has a next, update currentOutcomeId
                      if (outcome && outcome.next) {
                        adventure.currentOutcomeId = outcome.next;
                        adventure.pastEncounters.push(
                          adventure.currentOutcomeId
                        );
                      } else {
                        adventure.currentOutcomeId = null;
                        adventure.currentStory = null; // Or handle end of adventure
                      }

                      //console.log("stageData", stageData);
                      console.log("outcome", outcome);
                      console.log("outcome.next", outcome?.next);
                      adventure.getPlayer().clearLogs();
                      //adventure.getPlayer().clearBattleLogs();

                      progressAdventure(io, socket, adventure, stage);
                    } else {
                      console.error(
                        `ADV: adventure or stage does not exist for player id: ${playerId} \n
                    ${adventure}, ${stage}`
                      );
                    }
                  } else {
                    console.log(`ADV: GAME OVER!`);
                    socket.emit("adventure_defeat");
                  }
                } else {
                  console.error(
                    `ADV: Player does not have name... ${playerName}`
                  );
                }
              } else {
                let actions = player?.getMonster()?.getPossibleActionStates();
                io.to(playerId).emit("possible_actions", actions);
              }
            }, 3000);
          }, 2000);
        }, 1000);
      }
    }
  );
};
