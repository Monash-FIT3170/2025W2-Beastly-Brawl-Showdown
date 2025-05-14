import { Server, Socket } from "socket.io";
import { battles } from "../../../main";
import { MonsterState } from "types/single/monsterState";

export const characterSelectHandler = (io: Server, socket: Socket) => {
  socket.on(
    "character_selected",
    ({
      battleId,
      selectedMonster,
    }: {
      battleId: string;
      selectedMonster: MonsterState;
    }) => {
      const battle = battles.get(battleId);
      if (!battle) return;

      const playerId = socket.id;

      const state = battle.getBattleState(playerId);
      if (!state) return;

      // Directly assign the selected monster
      state.yourPlayerMonster = selectedMonster;
      io.to(battleId).emit(
        "battle_state_updated",
        battle.getBattleState(playerId)
      );
      console.log(
        `Player ${playerId} selected a monster in battle ${battleId}.`
      );
    }
  );
};
