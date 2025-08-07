import { Server, Socket } from "socket.io";
import { players, activeGameSessions } from "../../../main";

import {
  MonsterIdentifier,
  MonsterState,
} from "../../../../types/single/monsterState";

import { RockyRhino } from "../../model/game/monster/rockyRhino";
import { PouncingBandit } from "../../model/game/monster/pouncingBandit";
import { CinderTail } from "../../model/game/monster/cinderTail";
import { KillingBluey } from "../../model/game/monster/killingBluey";
import { PoisonFrog } from "../../model/game/monster/poisonFrog";
import { CharmerCobra } from "../../model/game/monster/charmerCobra";

export const characterSelectHandler = (io: Server, socket: Socket) => {
  socket.on(
    "monster_selected",
    ({ monsterID }: { monsterID: MonsterIdentifier }) => {
      console.log(`Made it to characterSelectHandler`);

      const playerId = socket.id;

      const monster = getMonster(monsterID);
      if (!monster) {
        console.error(`Invalid monster name: ${monsterID}`);
        return;
      }

      const player = players.get(socket.id);
      if (!player) {
        console.error(`Player ${playerId} not found`);
        return;
      }

      player.setMonster(monster);

      const gameCode = player.getGameCode();
      const gameCodeN = Number(gameCode);
      const session = activeGameSessions.get(gameCodeN);

      if (!session) {
        // If session of given game code doesn't exist
        console.log(`Join request failed. Invalid Code`);
        return;
      }

      // Update host information
      io.to(`game-${gameCode}`).emit("update-players", {
        message: `Player ${player.getName()} - ${
          socket.id
        } added to current game session.`,
        players: session.getPlayerStates(),
      });
      console.log(`Player ${playerId} selected ${monster.getName()}.`);
    }
  );

  socket.on("request_monster_list", () => {
    console.log("Requesting monster list from server");

    const monsters = Array.from(monsterMap.values()).map((createMonster) =>
      createMonster().getMonsterState()
    );

    socket.emit("monster_list", monsters);
  });
};

// Function to create a monster by its name
const monsterMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => new RockyRhino()],
  [MonsterIdentifier.POUNCING_BANDIT, () => new PouncingBandit()],
  [MonsterIdentifier.CINDER_TAIL, () => new CinderTail()],
  [MonsterIdentifier.KILLING_BLUEY, () => new KillingBluey()],
  [MonsterIdentifier.POISON_FROG, () => new PoisonFrog()],
  [MonsterIdentifier.CHARMER_COBRA, () => new CharmerCobra()],
]);

function getMonster(monsterID: MonsterIdentifier) {
  const createMonster = monsterMap.get(monsterID);
  return createMonster ? createMonster() : null;
}
