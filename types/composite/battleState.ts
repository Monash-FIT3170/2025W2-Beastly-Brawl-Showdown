import { UUID } from "crypto";
import { MonsterState } from "types/single/monsterState";
import { PlayerState } from "types/single/playerState";


export enum BattlePhase {
	CHOOSE_ACTION = "CHOOSE_ACTION",
	EXECUTE_ACTION = "EXECUTE_ACTION"
  }

export interface BattleState {
  id: UUID;
  turn: number;
  yourPlayer: PlayerState;
  yourPlayerMonster: MonsterState;
  opponentPlayer: PlayerState;
  opponentPlayerMonster: MonsterState;
  isOver: boolean;
}
