import { Server, Socket } from "socket.io";
import { players, activeGameSessions, playerAccounts } from "../../../main";
import { getMonster } from "../../model/game/monster/monsterMap";
import { monsterMap } from "../../model/game/monster/monsterMap";
import {
  ArchetypeIdentifier,
  MonsterIdentifier,
  MonsterState,
} from "../../../../types/single/monsterState";
import { Defender } from "../../model/game/archetype/defender";
import { Attacker } from "../../model/game/archetype/attacker";
import { Balanced } from "../../model/game/archetype/balanced";
import { Archetype } from "../../model/game/archetype/archetype";

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

  socket.on("request_adventure_monster_list", () => {
    console.log("ADV: Requesting monster list from server");
    const user = playerAccounts.get(socket.id);
    const unlockedMonsters = user?.adventureProgression.unlockedMonsters;
    if (unlockedMonsters) {
      const monsters = Array.from(monsterMap.entries())
        .filter(([monster]) => unlockedMonsters[monster])
        .map(([_, createMonster]) => createMonster().getMonsterState());
      socket.emit("adventure_monster_list", monsters);
    } else {
      console.error(`${user?.username} Unlocked Monsters does not exist`);
    }
    //  adventureProgression.unlockedMonsters: Record<string, boolean>,
    // // e.g  {'ROCKY_RHINO': true, 'CINDER_TAIL': false, 'POUNCING_BANDIT': false},
  });

  socket.on("request_archetype_list", () => {
    console.log("Requesting archetype list from server");

    const archetypes = Array.from(
      archetypeArray.map((createArchetype) =>
        createArchetype().getArchetypeInfo()
      )
    );

    socket.emit("archetype_list", archetypes);
  });
};

const archetypeArray: Array<() => Archetype> = [
  () => new Defender(),
  () => new Attacker(),
  () => new Balanced(),
];
