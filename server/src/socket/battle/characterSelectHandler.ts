import { Server, Socket } from "socket.io";
import { players, activeGameSessions } from "../../../main";

import {
  MonsterIdentifier,
  MonsterState,
} from "../../../../types/single/monsterState";

import { StonehideGuardian } from "../../model/game/monster/stonehideGuardian";
import { shadowfangPredator } from "../../model/game/monster/shadowfangPredator";
import { MysticWvyren } from "../../model/game/monster/mysticWyvern";

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
  [MonsterIdentifier.STONEHIDE_GUARDIAN, () => new StonehideGuardian()],
  [MonsterIdentifier.SHADOWFANG_PREDATOR, () => new shadowfangPredator()],
  [MonsterIdentifier.MYSTIC_WYVERN, () => new MysticWvyren()],
]);

function getMonster(monsterID: MonsterIdentifier) {
  const createMonster = monsterMap.get(monsterID);
  return createMonster ? createMonster() : null;
}
