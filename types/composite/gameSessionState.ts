import { PlayerState } from "types/single/playerState";

export interface GameSessionState {
  id: string;
  turn: number;
  player1: PlayerState;
  player2: PlayerState;
}
