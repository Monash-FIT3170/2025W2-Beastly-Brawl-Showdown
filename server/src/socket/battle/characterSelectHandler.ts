import { Server, Socket } from "socket.io";
import { players, activeGameSessions } from "../../../main";

import {
  MonsterIdentifier,
  MonsterState,
} from "../../../../types/single/monsterState";

import {
  StonehideGuardian,
  test1,
  test2,
} from "../../model/game/monster/stonehideGuardian";

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

      player.setMonsterCode(getMonsterCode(monsterID));
      player.setMonster(monster);

      const gameCode = player.getGameCode();
      const gameCodeN = Number(gameCode);
      const session = activeGameSessions.get(gameCodeN);
      // Update host information
      io.to(`game-${gameCode}`).emit("update-players", {
        message: `Player ${player.getName()} - ${
          socket.id
        } added to current game session.`,
        players: session.players.getItems(),
      });
      console.log(`Player ${playerId} selected ${monster.getName()}.`);
    }
  );

  socket.on("request_monster_list", () => {
    socket.emit("monster_list", MonsterList);
  });
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

export var MonsterList: MonsterState[] = [
  new StonehideGuardian().getMonsterState(),
  new test1().getMonsterState(),
  new test2().getMonsterState(),
];

function getMonsterCode(monsterID: MonsterIdentifier) {
  const createMonster = monsterCodeMap.get(monsterID);
  return createMonster ? createMonster() : "None";
}

const monsterCodeMap = new Map([
  [MonsterIdentifier.STONEHIDE_GUARDIAN, () => "StonehideGuardian"],
  [MonsterIdentifier.SHADOWFANG_PREDATOR, () => "ShadowFangPredator"],
  [MonsterIdentifier.MYSTIC_WYVERN, () => "MysticWyvern"],
]);
