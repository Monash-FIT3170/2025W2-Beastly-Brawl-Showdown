import { Server, Socket } from "socket.io";
import { activeAdventures, activeEvents, players, battles, playerAccounts, activeGameSessions } from "../../main";
import { Player } from "../model/game/player";
import { SeasonalEvent } from "../model/seasonal_event/seasonalEvent";
import { SpookGarden } from "../../src/model/seasonal_event/spookGarden";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getMonster, getEventMonster } from "../model/game/monster/monsterMap";
import { Battle } from "../model/game/battle";
import proceedBattleTurn from "./battle/startBattleHandler";
import GameSession from "../model/host/gameSession";
import { unwatchFile } from "fs";
import { Adventure } from "../model/game/adventure";

export const SeasonalEventModeHandler = (io: Server, socket: Socket) => {

  socket.on("event_selected", async ({ monsterId }) => {
    // const playingEvent = new GameSession(socket.id, {mode: new SeasonalEvent()});

    const playerSchema = playerAccounts.get(socket.id);
    const name = playerSchema?.username ?? "Event Boss Slayer";
    const player = new Player(socket.id, name, playerSchema ?? null); // TODO: Use real player name
    players.set(socket.id, player);
    
    const level = new Date().getMonth() + 1000;
    const adventure = new Adventure(player, level);
    // Track which outcome we're on
    adventure.currentOutcomeId = "initial";
    activeAdventures.set(socket.id, adventure);
    console.log(`SEV: Seasonal Event ${level - 1000} Selected for ${socket.id}`);


  });

  //MONSTER SELECT SOCKET
    socket.on(
      "event_monster_selected", async ({ monsterID, eventMonsterID }: { monsterID: MonsterIdentifier, eventMonsterID: MonsterIdentifier }) => {

        console.log(`${monsterID} --- ${eventMonsterID}`)

        const adventure = activeAdventures.get(socket.id);
  
        if (!adventure) {
          console.error(`Invalid event: ${socket.id}`);
          socket.emit("event_error", {
            message: "Invalid event",
          });
          return;
        }

        socket.emit("start_event", adventure.getLevelMonster());
  
        const playerMonster = getMonster(monsterID);
        if (!playerMonster) {
          console.error(`Invalid monster name: ${monsterID}`);
          socket.emit("adventure_error", {
            message: "Invalid monster selected.",
          });
          return;
        }
      }
    );

}
