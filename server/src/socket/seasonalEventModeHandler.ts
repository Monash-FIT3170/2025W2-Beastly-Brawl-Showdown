import { Server, Socket } from "socket.io";
import { activeAdventures, activeEvents, players, battles, playerAccounts } from "../../main";
import { Player } from "../model/game/player";
import { SeasonalEvent } from "../model/seasonal_event/seasonalEvent";
import { SpookGarden } from "../model/seasonal_event/SpookGarden";

export const SeasonalEventModeHandler = (io: Server, socket: Socket) => {

  socket.on("event_selected", async ({ event }) => {
    const player = new Player(socket.id, "Guest", null); // TODO: Use real player name
    players.set(socket.id, player);
    const playingEvent = new SpookGarden();
    activeEvents.set(socket.id, playingEvent);
    console.log(`ADV: Event ${playingEvent} Selected for ${socket.id}`);
  });

}