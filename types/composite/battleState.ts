import { UUID } from "crypto";
import { MonsterState } from "types/single/monsterState";
import { PlayerState } from "types/single/playerState";

export interface BattleState {
  id: UUID;
  turn: number;
  yourPlayer: PlayerState;
  yourPlayerMonster: MonsterState;
  opponentPlayer: PlayerState;
  opponentPlayerMonster: MonsterState;
}
