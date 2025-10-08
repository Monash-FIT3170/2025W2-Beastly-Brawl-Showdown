import { Server, Socket } from "socket.io";
import { activeAdventures, players, battles, playerAccounts } from "../../main";
import { Adventure } from "../model/game/adventure";
import { Player } from "../model/game/player";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Battle } from "../model/game/battle";
import { loadStage } from "../model/adventure/stageLoader";
import { resolveOutcome } from "../model/adventure/storyResolver";
import { storyOutcomes, storyStruct } from "/types/composite/storyTypes";
import { getMonster } from "../model/game/monster/monsterMap";
import { Action } from "../model/game/action/action";
import { AttackAction } from "../model/game/action/attack";
import { ConsumableState } from "/types/single/itemState";
import { ConsumeAction } from "../model/game/action/consume";
import { createEquipment } from "../model/adventure/factories/equipmentFactory";
import { createConsumable } from "../model/adventure/factories/consumableFactory";
import { DamageHeal } from "../model/game/status/damageHeal";
import { Poison } from "../model/game/status/poison";
import { Stun } from "../model/game/status/stun";
import { SlimeSubstance } from "../model/game/consumables/slimeSubstance";
import { StoryItem } from "../model/game/storyItem/storyItem";
import { SlimeBoost } from "../model/game/status/slimeBoost";
import { Equipment } from "../model/game/equipment/equipment";
import { updatePlayerAccount } from "../database/dbManager";
import { createStoryItem } from "../model/adventure/factories/storyItemFactory";
import { FightersBandana } from "../model/game/equipment/fightersBandana";
import { BlackBelt } from "../model/game/equipment/blackBelt";
import { Consumable } from "../model/game/consumables/consumable";

export const adventureModeHandler = (io: Server, socket: Socket) => {
  // Monster selection and adventure start

  //LEVEL SELECT SOCKET
  socket.on("request_unlocked_levels", () => {
    console.log("ADV: Requesting unlocked levels from server");
    const user = playerAccounts.get(socket.id);
    const unlockedLevels = user?.adventureProgression.unlockedLevels;
    socket.emit("unlocked_levels", unlockedLevels);
  });

  socket.on("adventure_level_selected", async ({ level }) => {
    const player = new Player(socket.id, "Guest", null); // TODO: Use real player name
    players.set(socket.id, player);
    const adventure = new Adventure(player, level);
    // Track which outcome we're on
    adventure.currentOutcomeId = "initial";
    activeAdventures.set(socket.id, adventure);
    console.log(`ADV: Level ${level} Selected for ${socket.id}`);
  });

  //MONSTER SELECT SOCKET
  socket.on(
    "adventure_monster_selected",
    async ({ monsterID }: { monsterID: MonsterIdentifier }) => {
      const adventure = activeAdventures.get(socket.id);

      if (!adventure) {
        console.error(`Invalid adventure: ${socket.id}`);
        socket.emit("adventure_error", {
          message: "Invalid adventure",
        });
        return;
      }
      socket.emit("start_adventure", adventure.getLevelMonster());

      const monster = getMonster(monsterID);
      if (!monster) {
        console.error(`Invalid monster name: ${monsterID}`);
        socket.emit("adventure_error", {
          message: "Invalid monster selected.",
        });
        return;
      }

      const player = adventure.getPlayer();

      player.setMonster(monster);
      // player.addStatus(new SlimeBoost(3));
      //progressAdventure(io, socket, adventure, adventure.getStage());
    }
  );

  socket.on("failed_connection", async ({}) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;

    progressAdventure(io, socket, adventure, adventure.getStage());
  });
  // Handle next outcome in adventure
  socket.on("adventure_next", async ({ stage }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;

    const lastOutcome = loadNextStory(io, adventure, socket);

    if (lastOutcome && lastOutcome.next) {
      adventure.currentOutcomeId = lastOutcome.next;
      adventure.pastEncounters.push(adventure.currentOutcomeId);
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
    adventure.pastEncounters.push(choiceId);
    progressAdventure(io, socket, adventure, stage);
  });

  //
  socket.on(
    "adventure_consume",
    ({
      consumable,
      playerId,
    }: {
      consumable: ConsumableState;
      playerId: string;
    }) => {
      console.log(
        `ADV: Player - ${playerId}, Adding Consumable - ${consumable.name}`
      );
      const player = players.get(playerId);
      if (!player?.hasConsumable(consumable.name)) {
        console.error(
          `${player?.getName()} does not have consumable of name ${
            consumable.name
          }`
        );
      } else {
        const item = player.getConsumable(consumable.name);
        const action = new ConsumeAction(item);
        player.addAction(action);
        player.removeConsumable(item);
      }
    }
  );

  socket.on("adventure_replace_equipment", ({ removeIndex, newEquipment }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;

    const player = adventure.getPlayer();
    const equipmentList = player.getEquipment();

    // Remove the equipment at the selected index
    if (removeIndex >= 0 && removeIndex < equipmentList.length) {
      equipmentList.splice(removeIndex, 1);

      // Reconstruct the Equipment instance using your factory
      // newEquipment should have an id property
      if (newEquipment && newEquipment.id) {
        const newEquipInstance = createEquipment(newEquipment.id);
        equipmentList.splice(removeIndex, 0, newEquipInstance);
      }
    }

    // Send updated player state to client
    socket.emit("adventure_state", {
      type: "update_player",
      player: player.getPlayerState(),
    });

    // Continue the adventure
    progressAdventure(io, socket, adventure, adventure.getStage());
  });

  socket.on("adventure_take_consumable", ({ consumableId, stage }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;
    const player = adventure.getPlayer();

    if (consumableId) {
      const consumable = createConsumable(consumableId);
      player.giveConsumable(consumable);
      const lastOutcome = loadNextStory(io, adventure, socket);

      if (lastOutcome && lastOutcome.next) {
        adventure.currentOutcomeId = lastOutcome.next;
        adventure.pastEncounters.push(adventure.currentOutcomeId);
      } else {
        // If no next, end or error
        adventure.currentOutcomeId = "";
      }

      progressAdventure(io, socket, adventure, stage);
    }
  });

  socket.on("adventure_take_storyItem", ({ storyItemId, stage }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;
    const player = adventure.getPlayer();

    if (storyItemId) {
      const storyItem = createStoryItem(storyItemId);
      player.giveStoryItem(storyItem);
      const lastOutcome = loadNextStory(io, adventure, socket);

      if (lastOutcome && lastOutcome.next) {
        adventure.currentOutcomeId = lastOutcome.next;
        adventure.pastEncounters.push(adventure.currentOutcomeId);
      } else {
        // If no next, end or error
        adventure.currentOutcomeId = "";
      }

      progressAdventure(io, socket, adventure, stage);
    }
  });

  socket.on("adventure_prereq_choice", ({ itemNames }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;
    const player = adventure.getPlayer();
    console.log("THESE ARE THE ITEM NAMES", itemNames);
    itemNames.forEach((item) => {
      player.removeStoryItem(item);
    });
  });

  socket.on("monster_request", ({ id }) => {
    const monster = getMonster(id);
    if (monster) {
      socket.emit("monster_response", monster.getMonsterState());
    } else {
      socket.emit("adventure_unlock_error", { message: "Monster not found" });
    }
  });

  socket.on("adventure_take_equipment", ({ equipmentId, stage }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;
    const player = adventure.getPlayer();

    if (equipmentId) {
      const equipment = createEquipment(equipmentId);
      equipment.calculateStrength(adventure.getStage());
      const success = player.giveEquipment(equipment);
      if (!success) {
        // Inventory full, emit and do NOT progress
        socket.emit("adventure_equipment_full", {
          currentEquipment: player.getEquipment().map((e) => e.getState()),
          incomingEquipment: equipment.getState(),
        });
        return;
      }
      // If successful, continue adventure

      const lastOutcome = loadNextStory(io, adventure, socket);

      if (lastOutcome && lastOutcome.next) {
        adventure.currentOutcomeId = lastOutcome.next;
        adventure.pastEncounters.push(adventure.currentOutcomeId);
      } else {
        // If no next, end or error
        adventure.currentOutcomeId = "";
      }

      progressAdventure(io, socket, adventure, stage);
    }
  });

  socket.on("request_adventure_endless_record", () => {
    console.log("ADV: Requesting Adventure Record From Server");
    const user = playerAccounts.get(socket.id);
    const endlessRecord = user?.adventureProgression.stage;
    if (endlessRecord) {
      socket.emit("adventure_endless_record", endlessRecord);
    } else {
      console.error(`${user?.username} Unlocked Monsters does not exist`);
    }
  });

  // Helper function to progress adventure outcomes
  export async function progressAdventure(
    io: Server,
    socket: Socket,
    adventure: Adventure,
    stage: number
  ) {
    try {
      const outcome = loadNextStory(io, adventure, socket);
      if (!outcome) {
        return;
      }
      console.log(outcome);
      const resolved = resolveOutcome(outcome!);

      if (resolved.type === "FIGHT") {
        // Create bot and battle
        const bot = new Player(
          resolved.enemy!.getId(),
          resolved.enemy?.getName()!,
          null,
          true
        ); // Eventually use bot class
        if (resolved.scaling) {
          resolved.enemy?.pveScaling(adventure.getStage() * resolved.scaling);
        } else {
          resolved.enemy?.pveScaling(adventure.getStage());
        }

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
        battle.getPlayers().forEach((p) => {
          p.startStatusEffects();
        });
        socket.emit("adventure_state", {
          type: "battle",
          battle: battle.getBattleState(socket.id),
          stage: adventure.getStage(),
          player: adventure.getPlayer().getPlayerState(),
        });
        let actions = adventure
          .getPlayer()
          ?.getMonster()
          ?.getPossibleActionStates();
        socket.emit("possible_actions", actions);
        //Clear logs from previous battle.
        //um note i did this but it didn't clear lmfaoo??
        // Optionally, proceed with the battle logic
        // proceedAdventureTurn(io, socket, adventure, battle);
      } else if (resolved.type === "DIALOGUE") {
        //Used for monster info

        socket.emit("adventure_state", {
          type: "dialogue",
          dialogue: resolved.result,
          enemy: resolved.enemy,
          next: resolved.next,
          player: adventure.getPlayer().getPlayerState(),
          stage: adventure.getStage(),
        });
      } else if (resolved.type === "RANDOM") {
        const roll = Math.random() * 100;
        var chanceTotal = 0;
        if (resolved.options) {
          for (const option of resolved.options) {
            chanceTotal += option.chance!;
            if (roll < chanceTotal) {
              adventure.currentOutcomeId = option.next;
              adventure.pastEncounters.push(adventure.currentOutcomeId);
              break;
            }
          }
        }
        progressAdventure(io, socket, adventure, stage);
      } else if (resolved.type === "CHOICE") {
        console.log(resolved);
        socket.emit("adventure_state", {
          type: "choice",
          result: resolved.result,
          choices: resolved.options,
          stage: adventure.getStage(),
          player: adventure.getPlayer().getPlayerState(),
        });
        console.log(resolved);
      } else if (resolved.type === "CONSUMABLE") {
        socket.emit("adventure_consumable", {
          consumable: resolved.consumable.getState() || "Unknown Consumable",
          consumableId: resolved.consumableId || "Unknown Consumable ID",
        });
      } else if (resolved.type === "STAT_CHANGE") {
        // Handle stat change
        const [stat, change] = resolved.statChange!;
        adventure.getPlayer().changeStat(stat, change);

        if (adventure.getPlayer().getHealth() > 0) {
          socket.emit("adventure_state", {
            type: "stat_change",
            result: resolved.result,
            next: resolved.next,
            stage: adventure.getStage(),
            player: adventure.getPlayer().getPlayerState(),
          });
        } else {
          socket.emit("adventure_defeat");
        }
      } else if (resolved.type === "EQUIPMENT") {
        const loot = resolved.equipment;
        loot.calculateStrength(adventure.getStage());
        // console.error("DEBUG: equipment", loot);
        socket.emit("adventure_equipment", {
          equipment: loot.getState() || "Unknown equipment",
          equipmentId: resolved.equipmentId || "unknown_equipment",
        });
      } else if (resolved.type === "PREREQUISITE") {
        for (const option of resolved.options!) {
          if (!option.prerequisite) {
            adventure.currentOutcomeId = option.next;
            adventure.pastEncounters.push(adventure.currentOutcomeId);
            break;
          }
          const setB = new Set(
            adventure
              .getPlayer()
              .getStoryItems()
              .map((c) => c.getName())
          );
          const allPresent = option.prerequisite?.every((item) =>
            setB.has(item)
          );
          if (allPresent) {
            adventure.currentOutcomeId = option.next;
            adventure.pastEncounters.push(adventure.currentOutcomeId);
            break;
          }
        }
        progressAdventure(io, socket, adventure, stage);
      } else if (resolved.type === "STATUS") {
        // Handle status
        adventure.getPlayer().addStatus(resolved.status!);
        console.log(resolved.statusId);
        socket.emit("adventure_state", {
          type: "status",
          result: resolved.result,
          next: resolved.next,
          stage: adventure.getStage(),
          player: adventure.getPlayer().getPlayerState(),
        });
      } else if (resolved.type === "LOOT_POOL") {
        if (resolved.randomLoot() instanceof Equipment) {
          const loot = resolved.randomLoot();
          loot.calculateStrength(adventure.getStage());
          // console.error("DEBUG: random loot equipment", loot);
          socket.emit("adventure_equipment", {
            equipment: loot.getState() || "Unknown equipment",
            equipmentId: resolved.lootId || "unknown_equipment",
          });
        } else if (resolved.randomLoot() instanceof Consumable) {
          socket.emit("adventure_consumable", {
            consumable:
              resolved.randomLoot()?.getState() || "Unknown Consumable",
            consumableId: resolved.lootId || "unknown_consumable",
          });
        } else {
          socket.emit("adventure_storyItem", {
            storyItem: resolved.randomLoot()?.getState() || "Unkown Story Item",
            storyItemId: resolved.lootId || "unknown_story_item",
          });
        }
      } else if (resolved.type === "STORY_ITEM") {
        console.log(resolved);
        socket.emit("adventure_storyItem", {
          storyItem: resolved.storyItem?.getState() || "Unknown Story Item",
          storyItemId: resolved.storyItemId || "unknown_story_item",
        });
      }
    } catch (err) {
      console.error("Adventure stage load error:", err);
      socket.emit("adventure_error", {
        message: "Failed to load adventure stage.",
      });
    }
  }
};

export function loadNextStory(
  io: Server,
  adventure: Adventure,
  socket: Socket
): storyOutcomes | undefined {
  let stageData = adventure.currentStory;

  if (!adventure.currentStory || !adventure.currentOutcomeId) {
    adventure.currentOutcomeId = "initial";
    adventure.incrementStage();
    const stage = adventure.getStage();
    const enemy = adventure.getLevelMonster();
    if (stage > 8 && adventure.getLevel() !== 0) {
      console.log("Adventure complete, emitting adventure_win", {
        monsterId: enemy,
      });
      io.to(socket.id).emit("adventure_win", { monsterId: enemy });
      //unlock monster
      const user = playerAccounts.get(socket.id);
      console.log(
        `${user?.username} has unlocked ${adventure.getLevelMonster()}`
      );
      var adventureProgression = user?.adventureProgression;
      if (adventureProgression) {
        adventureProgression.unlockedMonsters[adventure.getLevelMonster()] =
          true;
        adventureProgression.unlockedLevels.push(adventure.getLevel() + 1);
        updatePlayerAccount(user?._id, {
          adventureProgression: adventureProgression,
        });
        console.log(
          `${
            user?.username
          } has unlocked ${adventure.getLevelMonster()} and level ${
            adventure.getLevel() + 1
          }`
        );
      } else {
        console.error(`Failed to update ${user?._id}'s unlocked monsters.`);
      }
    }
    const loadNodes = loadStage(stage % 8);
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
