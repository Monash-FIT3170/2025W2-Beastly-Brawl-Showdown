import { Server, Socket } from "socket.io";
import { activeAdventures, activeEvents, players, battles, playerAccounts, activeGameSessions } from "../../main";
import { Player } from "../model/game/player";
import { SeasonalEvent } from "../model/host/gamemode/seasonalEvent";
import { SpookGarden } from "../../src/model/seasonal_event/spookGarden";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getMonster, getEventMonster } from "../model/game/monster/monsterMap";
import { Battle } from "../model/game/battle";
import proceedBattleTurn from "./battle/startBattleHandler";
import GameSession from "../model/host/gameSession";
import { unwatchFile } from "fs";

export const SeasonalEventModeHandler = (io: Server, socket: Socket) => {

  socket.on("event_selected", async ({ monsterId }) => {
    const player = new Player(socket.id, "Event Boss Slayer", null); // TODO: Use real player name
    players.set(socket.id, player);

    const playingEvent = new GameSession(socket.id, {mode: new SeasonalEvent()});

    console.log(`Added Session ${playingEvent.getMode()} (${playingEvent.getGameCode()})`);

    playingEvent.addPlayer(player);
    player.updateGameCode(playingEvent.getGameCode())
    activeGameSessions.set(playingEvent.getGameCode(), playingEvent);
    console.log(`SEASONALEVENT: Event  Selected for ${socket.id} and added player ${player.getName()} to ${player.getGameCode()}`);
  });

  //MONSTER SELECT SOCKET
    socket.on(
      "event_monster_selected", async ({ monsterID, eventMonsterID }: { monsterID: MonsterIdentifier, eventMonsterID: MonsterIdentifier }) => {

        const playerCode = players.get(socket.id);
        const gameCode = playerCode?.getGameCode();
        const gameCodeN = Number(gameCode);
        const event = activeGameSessions.get(gameCodeN);

        console.log(`Checking Event with Code ${gameCodeN} and event ${event} of event type ${event?.getMode()}`)
  
        if (!event) {
          console.error(`Invalid event: ${socket.id}`);
          socket.emit("event_error", {
            message: "Invalid event",
          });
          return;
        }
  
        const playerMonster = getMonster(monsterID);
        if (!playerMonster) {
          console.error(`Invalid monster name: ${monsterID}`);
          socket.emit("adventure_error", {
            message: "Invalid monster selected.",
          });
          return;
        }

        const bossMonster = getEventMonster(eventMonsterID);

        if (!bossMonster) {
          console.error(`Invalid monster name: ${eventMonsterID}`);
          socket.emit("adventure_error", {
            message: "Invalid monster selected.",
          });
          return;
        }
  
  
        playerCode?.setMonster(playerMonster);

        console.log(`Set ${playerMonster.getName()} for player ${playerCode?.getName()}`);

      const bot = new Player(
        bossMonster.getId(),
        "The Event Boss",
        null,
        true
      );

      bot.setMonster(bossMonster);
      players.set(bot.getId(), bot);

      if (playerCode != undefined) {
        const battle = new Battle(
        crypto.randomUUID(),
        playerCode,
        bot,
        socket.id
      );

      battles.set(socket.id, battle);

      console.log(`SEASONALEVENT: New Battle (${battle.getId()}) for ${socket.id} (Player Count: ${battle.getPlayers().length})`);

      for (const player of battle.getPlayers()) {
        io.sockets.sockets.get(player.getId())?.join(battle.getId());
        //Get all players to join a common game session socket room
        io.sockets.sockets.get(player.getId())?.join(`game-${gameCodeN}`);
      }

      socket.emit("start_event_battle", battle.getId());

      

      const session = activeGameSessions.get(gameCodeN);



      proceedBattleTurn(io, socket, session!, battle);

      }

      }
    );

}
