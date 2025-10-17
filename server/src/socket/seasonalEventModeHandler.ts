import { Server, Socket } from "socket.io";
import { activeAdventures, activeEvents, players, battles, playerAccounts } from "../../main";
import { Player } from "../model/game/player";
import { SeasonalEvent } from "../model/seasonal_event/seasonalEvent";
import { SpookGarden } from "../model/seasonal_event/SpookGarden";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getMonster } from "../model/game/monster/monsterMap";

export const SeasonalEventModeHandler = (io: Server, socket: Socket) => {

  socket.on("event_selected", async ({ event }) => {
    const player = new Player(socket.id, "Guest", null); // TODO: Use real player name
    players.set(socket.id, player);
    const playingEvent = new SpookGarden(player);
    activeEvents.set(socket.id, playingEvent);
    console.log(`ADV: Event ${playingEvent} Selected for ${socket.id}`);
  });

  //MONSTER SELECT SOCKET
    socket.on(
      "event_monster_selected",
      async ({ monsterID }: { monsterID: MonsterIdentifier }) => {
        const event = activeEvents.get(socket.id);
  
        if (!event) {
          console.error(`Invalid event: ${socket.id}`);
          socket.emit("event_error", {
            message: "Invalid event",
          });
          return;
        }
        // socket.emit("start_event", event.getLevelMonster());
  
        const monster = getMonster(monsterID);
        if (!monster) {
          console.error(`Invalid monster name: ${monsterID}`);
          socket.emit("adventure_error", {
            message: "Invalid monster selected.",
          });
          return;
        }
  
        const player = event.getPlayer();
  
        player.setMonster(monster);
        // player.addStatus(new SlimeBoost(3));
        //progressAdventure(io, socket, adventure, adventure.getStage());
      }
    );

}