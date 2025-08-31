import { ConsumableState, EquipmentState } from "./itemState";
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

  statuses: Status[];

  monster: MonsterState | null;

  logs: string[];
  battleLogs: string[];

  equipment: EquipmentState[];
  consumables: ConsumableState[];
}
