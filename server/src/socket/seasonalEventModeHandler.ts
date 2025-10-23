import { Server, Socket } from "socket.io";
import { players, battles, playerAccounts, activeSeasonalEvents } from "../../main";
import { Player } from "../model/game/player";
import { SeasonalEvent } from "../model/game/seasonalEvent";
import { SpookGarden } from "../../src/model/seasonal_event/spookGarden";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getMonster, getEventMonster } from "../model/game/monster/monsterMap";
import { Battle } from "../model/game/battle";
import proceedBattleTurn from "./battle/startBattleHandler";
import GameSession from "../model/host/gameSession";
import { unwatchFile } from "fs";
import { Adventure } from "../model/game/adventure";
import { storyOutcomes } from "../../../types/composite/storyTypes";
import { updatePlayerAccount } from "../database/dbManager";
// import { loadStage } from "../model/adventure/stageLoader";
import { event_info } from "../model/seasonal_event/event_info.json";
import { resolveOutcome } from "../model/adventure/storyResolver";
import { Equipment } from "../model/game/equipment/equipment";
import { loadStage } from "../model/adventure/stageLoader";

export const SeasonalEventModeHandler = (io: Server, socket: Socket) => {

  socket.on("event_selected", async ({ monsterId }) => {
    // const playingEvent = new GameSession(socket.id, {mode: new SeasonalEvent()});

    const playerSchema = playerAccounts.get(socket.id);
    const name = playerSchema?.username ?? "Event Boss Slayer";
    const player = new Player(socket.id, name, playerSchema ?? null); // TODO: Use real player name
    players.set(socket.id, player);
    
    const level = new Date().getMonth() + 1000;
    // const level = 1; // Uncomment for testing purposes with the general basis of it
    const seasonalEvent = new SeasonalEvent(player, level);
    // Track which outcome we're on
    seasonalEvent.currentOutcomeId = "initial";
    activeSeasonalEvents.set(socket.id, seasonalEvent);
    console.log(`SEV: Seasonal Event ${level} Selected for ${socket.id}`);

  });

  //MONSTER SELECT SOCKET
    socket.on(
      "event_monster_selected", async ({ monsterID, eventMonsterID }: { monsterID: MonsterIdentifier, eventMonsterID: MonsterIdentifier }) => {

        const seasonalEvent = activeSeasonalEvents.get(socket.id);
  
        if (!seasonalEvent) {
          console.error(`Invalid event: ${socket.id}`);
          socket.emit("event_error", {
            message: "Invalid event",
          });
          return;
        }

        socket.emit("start_event", seasonalEvent.getLevelMonster());
  
        const playerMonster = getMonster(monsterID);
        if (!playerMonster) {
          console.error(`Invalid monster name: ${monsterID}`);
          socket.emit("adventure_error", {
            message: "Invalid monster selected.",
          });
          return;
        }

        const player = seasonalEvent.getPlayer();
        player.setMonster(playerMonster);

      }
    );

      socket.on("failed_connection", async ({}) => {
        const seasonalEvent = activeSeasonalEvents.get(socket.id);
        if (!seasonalEvent) return;
    
        progressEvent(io, socket, seasonalEvent, seasonalEvent.getStage());
      });
      // Handle next outcome in the event
      socket.on("event_next", async ({ stage }) => {
        const seasonalEvent = activeSeasonalEvents.get(socket.id);
        if (!seasonalEvent) return;
    
        const lastOutcome = loadNextEventStory(io, seasonalEvent, socket);
    
        if (lastOutcome && lastOutcome.next) {
          seasonalEvent.currentOutcomeId = lastOutcome.next;
          seasonalEvent.pastEncounters.push(seasonalEvent.currentOutcomeId);
        } else {
          // If no next, end or error
          seasonalEvent.currentOutcomeId = "";
        }
    
        progressEvent(io, socket, seasonalEvent, stage);
      });
    
      //Handle choices
      //TODO: ASSIGN TO CHOICE BUTTONS
      socket.on("event_choice", async ({ stage, choiceId }) => {
        const seasonalEvent = activeSeasonalEvents.get(socket.id);
        if (!seasonalEvent) return;
    
        seasonalEvent.currentOutcomeId = choiceId;
        seasonalEvent.pastEncounters.push(choiceId);
        progressEvent(io, socket, seasonalEvent, stage);
      });
    
      socket.on("adventure_prereq_choice", ({ itemNames }) => {
        const seasonalEvent = activeSeasonalEvents.get(socket.id);
        if (!seasonalEvent) return;
        const player = seasonalEvent.getPlayer();
        console.log("THESE ARE THE ITEM NAMES", itemNames);
        itemNames.forEach((item) => {
          player.removeStoryItem(item);
        });
      });
    
      socket.on("monster_request", ({ id }) => {
        const monster = getMonster(id);
        if (monster) {
          socket.emit("monster_response", monster);
        } else {
          socket.emit("adventure_unlock_error", { message: "Monster not found" });
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


  export async function progressEvent(
    io: Server,
    socket: Socket,
    event: SeasonalEvent,
    stage: number
  ) {
    try {
      console.log(`Event: ${event.getLevel()} Stage: ${event.getStage()} and Stage: ${stage}`)
      const outcome = loadNextEventStory(io, event, socket);
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
          resolved.enemy?.pveScaling(event.getStage() * resolved.scaling);
        } else {
          resolved.enemy?.pveScaling(event.getStage());
        }

        bot.setMonster(resolved.enemy!);
        players.set(resolved.enemy!.getId(), bot);

        // Optionally, update adventure state here if needed

        const battle = new Battle(
          crypto.randomUUID(),
          event.getPlayer(),
          bot,
          socket.id
        );
        battles.set(socket.id, battle);
        console.log(`SEV: New Battle for ${socket.id}`);
        // Send battle state to client
        battle.getPlayers().forEach((p) => {
          p.startStatusEffects();
          p.clearAnimations();
          p.setStartStatusAnimations();
        });

        // Update adventure state
        socket.emit("event_state", {
          type: "battle",
          battle: battle.getBattleState(socket.id),
          stage: event.getStage(),
          player: event.getPlayer().getPlayerState(),
        });

        // Update actions
        let actions = event
          .getPlayer()
          ?.getMonster()
          ?.getPossibleActionStates();
        socket.emit("possible_actions", actions);

        // Update animations
        socket.emit("update_animation", {
          phase: "default",
          player: event.getPlayer().getAnimations(),
          opp: battle
            .getPlayers()
            .filter((p) => p.getId() != event.getPlayer().getId())[0]
            .getAnimations(), //FIXME: there has got to be a better way to do this lol
        });

        // Optionally, proceed with the battle logic
        // proceedAdventureTurn(io, socket, adventure, battle);
      } else if (resolved.type === "DIALOGUE") {
        //Used for monster info

        socket.emit("event_state", {
          type: "dialogue",
          dialogue: resolved.result,
          enemy: resolved.enemy,
          next: resolved.next,
          player: event.getPlayer().getPlayerState(),
          stage: event.getStage(),
        });
      } else if (resolved.type === "RANDOM") {
        const roll = Math.random() * 100;
        var chanceTotal = 0;
        if (resolved.options) {
          for (const option of resolved.options) {
            chanceTotal += option.chance!;
            if (roll < chanceTotal) {
              event.currentOutcomeId = option.next;
              event.pastEncounters.push(event.currentOutcomeId);
              break;
            }
          }
        }
        progressEvent(io, socket, event, stage);
      } else if (resolved.type === "CHOICE") {
        console.log(resolved);
        socket.emit("event_state", {
          type: "choice",
          result: resolved.result,
          choices: resolved.options,
          stage: event.getStage(),
          player: event.getPlayer().getPlayerState(),
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
        event.getPlayer().changeStat(stat, change);

        if (event.getPlayer().getHealth() > 0) {
          socket.emit("event_state", {
            type: "stat_change",
            result: resolved.result,
            next: resolved.next,
            stage: event.getStage(),
            player: event.getPlayer().getPlayerState(),
          });
        } else {
          socket.emit("event_defeat");
        }
      } else if (resolved.type === "EQUIPMENT") {
        socket.emit("adventure_equipment", {
          equipment: resolved.equipment?.getState() || "Unknown equipment",
          equipmentId: resolved.equipmentId || "unknown_equipment",
        });
      } else if (resolved.type === "PREREQUISITE") {
        for (const option of resolved.options!) {
          if (!option.prerequisite) {
            event.currentOutcomeId = option.next;
            event.pastEncounters.push(event.currentOutcomeId);
            break;
          }
          const setB = new Set(
            event
              .getPlayer()
              .getStoryItems()
              .map((c) => c.getName())
          );
          const allPresent = option.prerequisite?.every((item) =>
            setB.has(item)
          );
          if (allPresent) {
            event.currentOutcomeId = option.next;
            event.pastEncounters.push(event.currentOutcomeId);
            break;
          }
        }
        progressEvent(io, socket, event, stage);
      } else if (resolved.type === "STATUS") {
        // Handle status
        event.getPlayer().addStatus(resolved.status!);
        console.log(resolved.statusId);
        socket.emit("event_state", {
          type: "status",
          result: resolved.result,
          next: resolved.next,
          stage: event.getStage(),
          player: event.getPlayer().getPlayerState(),
        });
      } else if (resolved.type === "LOOT_POOL") {
        if (resolved.randomLoot() instanceof Equipment) {
          socket.emit("adventure_equipment", {
            equipment: resolved.randomLoot()?.getState() || "Unknown equipment",
            equipmentId: resolved.lootId || "unknown_equipment",
          });
        } else {
          socket.emit("adventure_consumable", {
            consumable:
              resolved.randomLoot()?.getState() || "Unknown Consumable",
            consumableId: resolved.lootId || "unknown_consumable",
          });
        }
      } else if (resolved.type === "STORY_ITEM") {
        console.log(resolved);
        socket.emit("adventure_storyItem", {
          storyItem: resolved.storyItem?.getState() || "Unknown story item",
          storyItemId: resolved.storyItemId || "unknown_storyItem",
        });
        console.log(resolved);
      }
    } catch (err) {
      console.error("Adventure stage load error:", err);
      socket.emit("adventure_error", {
        message: "Failed to load adventure stage.",
      });
    }
  };

}

export function loadNextEventStory(
  io: Server,
  event: SeasonalEvent,
  socket: Socket
): storyOutcomes | undefined {
  let stageData = event.currentStory;

  console.log(`Event: ${event} (${event.getId()}, ${event.getLevel()}, ${event.getStage()}) and Stage Data: ${stageData}`)

  if (!event.currentStory || !event.currentOutcomeId) {
    event.currentOutcomeId = "initial";
    event.incrementStage();
    const stage = event.getStage();
    const enemy = event.getLevelMonster();
    if (stage > 8 && event.getLevel() !== 0) {
      console.log("Event complete, emitting adventure_win", {
        monsterId: enemy,
      });
      io.to(socket.id).emit("event_win", { monsterId: enemy });
    }
    const loadNodes = loadStage(1000);
    const eligibleNodes = loadNodes.filter((node) => {
      const match = node.level.includes(event.getLevel());
      return match;
    });
    const randomNode = Math.floor(Math.random() * eligibleNodes?.length);
    stageData = eligibleNodes[randomNode];
    event.currentStory = stageData;
  }
  const outcome = stageData?.outcomes.find(
    (o) => o.id === event.currentOutcomeId
  );
  return outcome;
}

