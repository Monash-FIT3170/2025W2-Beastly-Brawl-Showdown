export interface PlayerState {
  id: string;
  name: string;

  currentHealth: number;
  currentAttackStat: number;
  currentArmourClassStat: number;

  logs: string[];
}
