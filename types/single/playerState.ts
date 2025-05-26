import { MonsterState } from "./monsterState";

export interface PlayerState {
  id: string;
  name: string;

  currentHealth: number;
  currentAttackStat: number;
  currentArmourClassStat: number;
  initialHealth: number;
  monsterName: string;
  successBlock: number;
  successHit: number; 

  monster: MonsterState | null;

  logs: string[];
  battleLogs: string[];
}
