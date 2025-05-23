import { PlayerState } from "types/single/playerState";
import Battle from "/client/src/types/battle";
import { BattleState } from "./battleState";

export interface GameSessionState {
  id: string;
  round: number;
  battleStates: BattleState[];
}
