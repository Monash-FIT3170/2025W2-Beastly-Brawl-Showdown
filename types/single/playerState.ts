import { Monster } from "/server/src/model/game/monster/monster";

export interface PlayerState {
  id: string;
  name: string;

  currentHealth: number;
  currentAttackStat: number;
  currentArmourClassStat: number;
  monster: Monster;

  logs: string[];
}
