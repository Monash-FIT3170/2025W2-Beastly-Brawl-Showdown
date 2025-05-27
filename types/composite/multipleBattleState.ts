import { UUID } from "crypto";
import { PlayerState } from "types/single/playerState";

export interface MultipleBattleState {
	battleId: UUID,
	turn: number,
	players: PlayerState[],
	isOver: boolean
}
