import { Server, Socket } from "socket.io";
import { activeAdventures, players, battles } from "../../main";

import { ActionState } from "/types/single/actionState";
import { NullAction } from "../model/game/action/null";

import { loadNextStory, progressAdventure } from "./adventureModeHandler";
import { ActionRandomiser } from "../model/game/actionRandomiser";

export const adventureTurnHandler = (io: Server, socket: Socket) => {
  // Handle player actions in adventure
  socket.on(
    "adventure_action",
    ({ action, playerId }: { action: ActionState; playerId: string }) => {
      console.log("ADV: Attempting action addition...");

      var battle = battles.get(playerId);
      var player = battle?.getPlayer(playerId);
      var actionToAdd = player?.getMonster()?.getAction(action.id);

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

      //ADDING ACTION TO BOT
      //TODO: set bots action

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

        // Emitting player1's action animations
        player1.getActions().forEach((action) => {
          const animationInfo = action.prepareAnimation();
          const animationType = animationInfo[0];
          const diceRollNumber = animationInfo[1];
          console.log(
            `ADV: Animation P1 - ${animationType}, ${diceRollNumber}`
          );
          io.to(player1.getId()).emit(String(animationType), diceRollNumber);
        });

        // Emitting player2's action animations
        player2.getActions().forEach((action) => {
          const animationInfo = action.prepareAnimation();
          const animationType = animationInfo[0];
          const diceRollNumber = animationInfo[1];
          console.log(
            `ADV: Animation P2 - ${animationType}, ${diceRollNumber}`
          );
          io.to(player2.getId()).emit(String(animationType), diceRollNumber);
        });

        // Remove possible actions essentially hiding the battle footer until animations and calculations are done.
        io.to(playerId).emit("possible_actions", []);

        //TIMEOUT - to allow animation
        setTimeout(() => {
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

          //update battlestate
          io.to(playerId).emit("adventure_state", {
            type: "battle",
            battle: battle?.getBattleState(playerId),
          });

          //reset stats
          playersInBattle.forEach((p) => {
            p.resetStats();
            p.resetActions();
            p.getMonster()?.removeTemporaryActions();
          });

          //check if battle is over
          if (battle?.isBattleOver()) {
            console.log(`ADV: battle is over!`);
            const winners = battle.getWinners();
            console.log(winners);
            const playerName = player?.getName();
            if (playerName) {
              //if the winner is the player
              if (winners?.includes(playerName)) {
                console.log(`ADV: player won!`);
                const adventure = activeAdventures.get(playerId);
                const stage = adventure?.getStage();
                //TODO: DO NEXT STAGE INSTEAD OF THIS STAGE
                console.log("stage: ", stage);
                console.log("adventure", adventure);
                if (adventure && stage) {
                  // Get current story node and outcome

                  const outcome = loadNextStory(adventure, socket);

                  // If outcome has a next, update currentOutcomeId
                  if (outcome && outcome.next) {
                    adventure.currentOutcomeId = outcome.next;
                    adventure.pastEncounters.push(adventure.currentOutcomeId);
                  } else {
                    adventure.currentOutcomeId = null;
                    adventure.currentStory = null; // Or handle end of adventure
                  }

                  //console.log("stageData", stageData);
                  console.log("outcome", outcome);
                  console.log("outcome.next", outcome?.next);
                  adventure.getPlayer().clearLogs();
                  adventure.getPlayer().clearBattleLogs();

                  progressAdventure(io, socket, adventure, stage);
                } else {
                  console.error(
                    `ADV: adventure or stage does not exist for player id: ${playerId} \n
                    ${adventure}, ${stage}`
                  );
                }
              } else {
                console.log(`ADV: GAME OVER!`);
                //TODO: implement
              }
            } else {
              console.error(`ADV: Player does not have name... ${playerName}`);
            }
          } else {
            playersInBattle.forEach((p) => {
              p.tickStatuses();
            });
            let actions = player?.getMonster()?.getPossibleActionStates();
            io.to(playerId).emit("possible_actions", actions);
          }
        }, 2000);
      }
    }
  );
};
