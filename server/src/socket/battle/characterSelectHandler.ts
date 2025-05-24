import { Server, Socket } from "socket.io";
import { battles, players } from "../../../main";
import { Battle } from "../../model/game/battle";
import { MonsterState } from "types/single/monsterState";
import { NullAction } from "../../model/game/action/null";

import {
  StonehideGuardian,
  test1,
  test2,
} from "../../model/game/monster/stonehideGuardian";
import { Monster } from "../../model/game/monster/monster";

export const characterSelectHandler = (io: Server, socket: Socket) => {
  socket.on("monster_selected", ({ monsterName }: { monsterName: string }) => {
    console.log(`Made it to characterSelectHandler`);

    const playerId = socket.id;

    const monster = createMonsterByName(monsterName);
    if (!monster) {
      console.error(`Invalid monster name: ${monsterName}`);
      return;
    }

    const player = players.get(socket.id);
    if (!player) {
      console.error(`Player ${playerId} not found`);
      return;
    }

    player.setMonster(monster);

    console.log(`Player ${playerId} selected ${monster.getName()}.`);
  });
};

// Function to create a monster by its name
export function createMonsterByName(name: string): Monster | null {
  switch (name) {
    case "Stonehide Guardian":
      return new StonehideGuardian();
    case "Shadowfang Predator":
      return new test1();
    case "Mystic Wyvern":
      return new test2();

    default:
      return null;
  }
}
