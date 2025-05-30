import { BattlePhase, BattleState } from "./battleState";
import { GameSessionData } from "../other/gameSessionData";

export interface GameSessionState {
  id: string;
  round: number;
  battleStates: BattleState[];
  gameSessionData: GameSessionData;
  currentPhase: BattlePhase;
  totalPlayers: number;
  remainingPlayers: number;
}
