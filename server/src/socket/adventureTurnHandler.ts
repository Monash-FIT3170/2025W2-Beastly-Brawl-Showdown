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

        // Prepare animations
        var player1DiceRoll = 0;
        var player2DiceRoll = 0;

        player1.getActions().forEach((action) => {
          const animationInfo = action.prepareAnimation();
          if (typeof animationInfo === "string") {
            player1.addPrepareAnimation(animationInfo);
            console.log(`ADV: Animation P1 - ${animationInfo}`);
          } else {
            const [animationType, diceRoll] = animationInfo;
            player1.addPrepareAnimation(animationType);
            player1DiceRoll = diceRoll;
            console.log(`ADV: Animation P1 - ${animationType}, ${diceRoll}`);
          }
        });

        player2.getActions().forEach((action) => {
          const animationInfo = action.prepareAnimation();
          if (typeof animationInfo === "string") {
            player2.addPrepareAnimation(animationInfo);
            console.log(`ADV: Animation P2 - ${animationInfo}`);
          } else {
            const [animationType, diceRoll] = animationInfo;
            player1.addPrepareAnimation(animationType);
            player2DiceRoll = diceRoll;
            console.log(`ADV: Animation P2 - ${animationType}, ${diceRoll}`);
          }
        });

        io.to(player1.getId()).emit("update_animation", "prepare");
        io.to(player2.getId()).emit("update_animation", "prepare");

        // Roll animations
        //TODO: add time out before dice roll
        if (player1.getPrepareAnimations().includes("roll_dice")) {
          io.to(player1.getId()).emit("roll_dice", player1DiceRoll);
        }
        if (player2.getPrepareAnimations().includes("roll_dice")) {
          io.to(player2.getId()).emit("roll_dice", player2DiceRoll);
        }

        //TODO: update battle footer to display animation stage if we want?
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

          // Execute animations
          io.to(player1.getId()).emit("update_animation", "execute");
          io.to(player2.getId()).emit("update_animation", "execute");
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
          });

          //update battlestate
          io.to(playerId).emit("adventure_state", {
            type: "battle",
            battle: battle?.getBattleState(playerId),
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
                    adventure.pastEncounters.push(adventure.currentOutcomeId);
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
              console.error(`ADV: Player does not have name... ${playerName}`);
            }
          } else {
            let actions = player?.getMonster()?.getPossibleActionStates();
            io.to(playerId).emit("possible_actions", actions);
          }
        }, 2000);
      }
    }
  );
};
