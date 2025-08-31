import { BattlePhase, BattleState } from "./battleState";
import { GameSessionData } from "../other/gameSessionData";
import { Player } from "server/src/model/game/player"
import { PlayerScore } from "../single/playerScore";

export interface GameSessionState {
  id: string;
  round: number;
  battleStates: BattleState[];
  gameSessionData: GameSessionData;
  currentPhase: BattlePhase;
  totalPlayers: number;
  remainingPlayers: number;
  waitingPlayers: Player[];
  metadata: GameSessionStateMetaData
}

export interface GameSessionStateMetaData{
  round?: number,
  playerScore?: Record<string,PlayerScore>
}
