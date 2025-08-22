import { MonsterState } from "./monsterState";
import { Status } from "/server/src/model/game/status/status";

export interface PlayerState {
  id: string;
  name: string;

  currentHealth: number;
  currentAttackStat: number;
  currentArmourClassStat: number;
  // initialHealth: number;
  // monsterName: string;
  successBlock: number;
  successHit: number; 

<<<<<<< HEAD
  statuses: Status[];
=======
  score: number | null;
>>>>>>> 258e14f (1001.8: Add score cards to scored game lobby.)

  monster: MonsterState | null;

  logs: string[];
  battleLogs: string[];
}
