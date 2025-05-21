import { Server, Socket } from "socket.io";
import { battles } from "../../../main";
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
  socket.on(
    "monster_selected",
    ({ battleId, monsterName }: { battleId: string; monsterName: string }) => {
      console.log(`Made it to characterSelectHandler`);
      const battle = battles.get(battleId);
      if (!battle) {
        console.log(`No Battle`);
        return;
      }

      const playerId = socket.id;

      const monster = createMonsterByName(monsterName);
      if (!monster) {
        console.error(`Invalid monster name: ${monsterName}`);
        return;
      }

      const player = battle.getPlayer(playerId);
      if (!player) {
        console.error(`Player ${playerId} not found in battle ${battleId}`);
        return;
      }

      player.setMonster(monster);

      console.log(
        `Player ${playerId} selected ${monster.getName()} in battle ${battleId}.`
      );

      // Check if all players have selected their monsters
      const allPlayersHaveMonsters = battle
        .getPlayers()
        .every((p) => p.getMonster() !== null);
      if (!allPlayersHaveMonsters) {
        console.log("Waiting for the other player to select a monster.");
        return;
      }

      console.log(`Battle ${battleId} has officially started.`);
      io.to(battleId).emit("battle_started", battleId);
      proceedBattleTurn(io, battle);
    }
  );
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

// Function to handle the battle turn logic
function proceedBattleTurn(io: Server, battle: Battle) {
  battle.clearBattleLogs();
  battle.incTurn();

  const playersInBattle = battle.getPlayers();

  playersInBattle.forEach((player) => {
    io.to(player.getId()).emit(
      "battle_state",
      battle.getBattleState(player.getId())
    );

    const actions = player.getMonster().getPossibleActionStates();
    io.to(player.getId()).emit("possible_actions", actions);
  });

  const [player1, player2] = playersInBattle;

  let timer = 10;
  const interval = setInterval(() => {
    if (timer >= 0) {
      io.to(battle.getId()).emit("timer", timer);
      timer--;
    } else {
      clearInterval(interval);

      playersInBattle.forEach((player) => {
        if (player.getActions().length === 0) {
          player.addAction(new NullAction());
        }
      });

      player1.getActions().forEach((action) => {
        action.prepare(player1, player2);
      });
      player2.getActions().forEach((action) => {
        action.prepare(player2, player1);
      });

      player1.getActions().forEach((action) => {
        action.execute(player1, player2);
      });
      player2.getActions().forEach((action) => {
        action.execute(player2, player1);
      });

      console.log("P1: ", player1);
      console.log("P2: ", player2);

      playersInBattle.forEach((player) => {
        io.to(player.getId()).emit(
          "battle_state",
          battle.getBattleState(player.getId())
        );
      });

      playersInBattle.forEach((player) => {
        player.resetStats();
        player.resetActions();
      });

      if (battle.isBattleOver()) {
        io.to(battle.getId()).emit("battle_end", battle.getWinner());
        return;
      }

      setTimeout(() => {
        proceedBattleTurn(io, battle);
      }, 2000);
    }
  }, 1000);
}
