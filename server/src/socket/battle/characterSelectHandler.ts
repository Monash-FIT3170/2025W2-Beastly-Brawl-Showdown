import { Server, Socket } from "socket.io";
import { battles, players } from "../../../main";
import { Battle } from "../../model/game/battle";
import { MonsterState, MonsterIdentifier } from "types/single/monsterState";
import { NullAction } from "../../model/game/action/null";

import {
  StonehideGuardian,
  test1,
  test2,
} from "../../model/game/monster/stonehideGuardian";
import { Monster } from "../../model/game/monster/monster";

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

      console.log(`Player ${playerId} selected ${monster.getName()}.`);
    }
  );
};

// Function to create a monster by its name
const monsterMap = new Map([
  [MonsterIdentifier.STONEHIDE_GUARDIAN, () => new StonehideGuardian()],
  [MonsterIdentifier.SHADOWFANG_PREDATOR, () => new test1()],
  [MonsterIdentifier.MYSTIC_WYVERN, () => new test2()],
]);

function getMonster(monsterID: MonsterIdentifier) {
  const createMonster = monsterMap.get(monsterID);
  return createMonster ? createMonster() : null;
}
