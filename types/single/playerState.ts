import { MonsterState } from "./monsterState";

export interface PlayerState {
  id: string;
  name: string;

  currentHealth: number;
  currentAttackStat: number;
  currentArmourClassStat: number;

  monster: MonsterState | null;

  logs: string[];
}
