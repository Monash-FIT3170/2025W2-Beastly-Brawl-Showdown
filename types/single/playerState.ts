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

  logs: string[];
  battleLogs: string[];
}
