import { Server, Socket } from "socket.io";
import { activeAdventures, players, battles } from "../../main";
import { Adventure } from "../model/game/adventure";
import { Player } from "../model/game/player";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Battle } from "../model/game/battle";
import proceedAdventureTurn from "./proceedAdventureTurn";
import { ActionState } from "/types/single/actionState";
import { loadStage } from "../model/adventure/stageLoader";
import { resolveOutcome } from "../model/adventure/storyResolver";
import { storyOutcomes, storyStruct } from "/types/composite/storyTypes";
import { NullAction } from "../model/game/action/null";
import { getMonster } from "../model/game/monster/monsterMap";

export const adventureModeHandler = (io: Server, socket: Socket) => {
  // Monster selection and adventure start

  socket.on("adventure_level_selected", async ({ level }) => {
    const player = new Player(socket.id, "Anika"); // TODO: Use real player name
    players.set(socket.id, player);
    const adventure = new Adventure(player, level);
    // Track which outcome we're on
    adventure.currentOutcomeId = "initial";
    activeAdventures.set(socket.id, adventure);
  });
  socket.on(
    "adventure_monster_selected",
    async ({ monsterID }: { monsterID: MonsterIdentifier }) => {
      const monster = getMonster(monsterID);
      if (!monster) {
        console.error(`Invalid monster name: ${monsterID}`);
        socket.emit("adventure_error", {
          message: "Invalid monster selected.",
        });
        return;
      }
      const adventure = activeAdventures.get(socket.id);

      if (!adventure) {
        console.error(`Invalid adventure: ${socket.id}`);
        socket.emit("adventure_error", {
          message: "Invalid adventure",
        });
        return;
      }
      const player = adventure.getPlayer();
      player.setMonster(monster);
      progressAdventure(io, socket, adventure, adventure.getStage());
    }
  );

  // Handle next outcome in adventure
  socket.on("adventure_next", async ({ stage }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;

    const lastOutcome = loadNextStory(adventure, socket);

    if (lastOutcome && lastOutcome.next) {
      adventure.currentOutcomeId = lastOutcome.next;
    } else {
      // If no next, end or error
      adventure.currentOutcomeId = "";
    }

    progressAdventure(io, socket, adventure, stage);
  });

  //Handle choices
  //TODO: ASSIGN TO CHOICE BUTTONS
  socket.on("adventure_choice", async ({ stage, choiceId }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;

    adventure.currentOutcomeId = choiceId;
    progressAdventure(io, socket, adventure, stage);
  });

  // Handle player actions in adventure
  socket.on(
    "adventure_action",
    ({ action, playerId }: { action: ActionState; playerId: string }) => {
      console.log("ADV: Attempting action addition...");

      var battle = battles.get(playerId);
      var player = battle?.getPlayer(playerId);
      var actionToAdd = player?.getMonster()?.getAction(action.id);

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

      //TODO: set bots action
      //because there's no timer - need to prepare / execute actions too!
      let playersInBattle = battle?.getPlayers();
      if (!playersInBattle) {
        console.error(`ADV: battle players empty ${playersInBattle}`);
      } else {
        let player1 = playersInBattle[0];
        let player2 = playersInBattle[1];

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

        // Emitting player1's action animations TO UPDATE
        player1.getActions().forEach((action) => {
          if (action.getName() === "Attack") {
            // get the animation name and dice number from the prepareAnimation method
            const animationInfo = action.prepareAnimation();
            const animationType = animationInfo[0];
            const diceRollNumber = animationInfo[1];
            console.log(animationType, diceRollNumber);
            io.to(player1.getId()).emit(String(animationType), diceRollNumber);
          }

          if (action.getName() === "Tip The Scales") {
            const animationInfo = action.prepareAnimation();
            const animationType = animationInfo[0];
            const diceRoll = animationInfo[1];
            io.to(player1.getId()).emit(animationType, diceRoll);
            console.log(
              `Player 1 used tip the scales and dice roll = ${diceRoll}`
            );
          }
        });

        // Emitting player2's action animations
        player2.getActions().forEach((action) => {
          if (action.getName() === "Attack") {
            const animationInfo = action.prepareAnimation();
            const animationType = animationInfo[0];
            const diceRollNumber = animationInfo[1];
            console.log(animationType, diceRollNumber);
            io.to(player2.getId()).emit(String(animationType), diceRollNumber);
          }

          if (action.getName() === "Tip The Scales") {
            const animationInfo = action.prepareAnimation();
            const animationType = animationInfo[0];
            const diceRoll = animationInfo[1];

            console.log(
              `Player 2 used tip the scales and dice roll = ${diceRoll}`
            );
            io.to(player2.getId()).emit(animationType, diceRoll);
          }
        });

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
              console.log(`P2 - ${player2.getName()} did nothing.`);
            }
          });

          io.to(playerId).emit("adventure_state", {
            type: "battle",
            battle: battle?.getBattleState(playerId),
          });

          playersInBattle.forEach((p) => {
            p.resetStats();
            p.resetActions();
            p.getMonster()?.removeTemporaryActions();
          });

          if (battle?.isBattleOver()) {
            console.log(`ADV: battle is over!`);
            const winners = battle.getWinners();
            console.log(winners);
            const playerName = player?.getName();
            if (playerName) {
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
                  } else {
                    adventure.currentOutcomeId = null;
                    adventure.currentStory = null; // Or handle end of adventure
                  }

                  //console.log("stageData", stageData);
                  console.log("outcome", outcome);
                  console.log("outcome.next", outcome?.next);

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
        }, 3000);
      }
    }
  );
};
// Helper function to progress adventure outcomes
async function progressAdventure(
  io: Server,
  socket: Socket,
  adventure: Adventure,
  stage: number
) {
  try {
    const outcome = loadNextStory(adventure, socket);
    if (!outcome) {
      return;
    }
    const resolved = resolveOutcome(outcome!);

    if (resolved.type === "FIGHT") {
      // Create bot and battle
      const bot = new Player(
        resolved.enemy!.getId(),
        resolved.enemy?.getName()!
      ); // Eventually use bot class
      resolved.enemy?.pveScaling(adventure.getStage());
      bot.setMonster(resolved.enemy!);
      players.set(resolved.enemy!.getId(), bot);

      // Optionally, update adventure state here if needed

      const battle = new Battle(
        crypto.randomUUID(),
        adventure.getPlayer(),
        bot,
        socket.id
      );
      battles.set(socket.id, battle);
      console.log(`ADV: New Battle for ${socket.id}`);
      // Send battle state to client
      socket.emit("adventure_state", {
        type: "battle",
        battle: battle.getBattleState(socket.id),
      });
      let actions = adventure
        .getPlayer()
        ?.getMonster()
        ?.getPossibleActionStates();
      socket.emit("possible_actions", actions);
      // Optionally, proceed with the battle logic
      proceedAdventureTurn(io, socket, adventure, battle);
    } else if (resolved.type === "DIALOGUE") {
      // Dialogue or other event
      socket.emit("adventure_state", {
        type: "dialogue",
        dialogue: resolved.result,
        enemy: resolved.enemy,
        next: resolved.next,
      });
    } else if (resolved.type === "RANDOM") {
      const roll = Math.random() * 100;
      var chanceTotal = 0;
      if (resolved.options) {
        for (const option of resolved.options) {
          chanceTotal += option.chance!;
          if (roll < chanceTotal) {
            adventure.currentOutcomeId = option.next;
            break;
          }
        }
      }
      progressAdventure(io, socket, adventure, stage);
    } else if (resolved.type === "CHOICE") {
      socket.emit("adventure_state", {
        type: "choice",
        result: resolved.result,
        choices: resolved.options,
      });
    } else if (resolved.type === "ITEM") {
      socket.emit("adventure_item", {
        name: resolved.item?.getName() || "Unknown Item",
      });
      adventure.getPlayer().addToInventory(resolved.item!);
    } else if (resolved.type === "STAT_CHANGE") {
      // Handle stat change
      const [stat, change] = resolved.statChange!;
      adventure.getPlayer().changeStat(stat, change);

      socket.emit("adventure_state", {
        type: "stat_change",
        result: resolved.result,
        next: resolved.next,
      });
    }
  } catch (err) {
    console.error("Adventure stage load error:", err);
    socket.emit("adventure_error", {
      message: "Failed to load adventure stage.",
    });
  }
}

function loadNextStory(
  adventure: Adventure,
  socket: Socket
): storyOutcomes | undefined {
  let stageData = adventure.currentStory;

  if (!adventure.currentStory || !adventure.currentOutcomeId) {
    adventure.currentOutcomeId = "initial";
    adventure.incrementStage();
    const stage = adventure.getStage();
    if (adventure.getStage() > 8) {
      socket.emit("adventure_win", { stage });
    }
    const loadNodes = loadStage(stage);
    const eligibleNodes = loadNodes.filter((node) => {
      const match = node.level.includes(adventure.getLevel());
      return match;
    });
    const randomNode = Math.floor(Math.random() * eligibleNodes?.length);
    stageData = eligibleNodes[randomNode];
    adventure.currentStory = stageData;
  }
  const outcome = stageData?.outcomes.find(
    (o) => o.id === adventure.currentOutcomeId
  );
  return outcome;
}
