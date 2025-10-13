import { BattlePhase, BattleState } from "./battleState";
import { GameSessionData } from "../other/gameSessionData";
import { Player } from "server/src/model/game/player"
import { GameModeIdentifier } from "../single/gameMode";
import { PlayerScore } from "../single/playerScore";
import { PlayerState } from "../single/playerState";

export interface GameSessionState {
  id: string;
  round: number;
  mode: GameModeIdentifier;
  battleStates: BattleState[];
  gameSessionData: GameSessionData;
  currentPhase: BattlePhase;
  totalPlayers: number;
  remainingPlayers: number;
  waitingPlayers: Player[];
  metadata: GameSessionStateMetaData
  isGameModeFinished: boolean;
}

export interface GameSessionStateMetaData{
  round?: number,
  playerScore?: Record<string,PlayerScore>
  top3Score?: PlayerScore[]
}

export interface GameSessionFinalResults {
  // Battle Royale
  finalWinner?: PlayerState | null;

  // Scoring Tournament
  top3Players?: PlayerState[];
  top3Scores?: PlayerScore[];
}
