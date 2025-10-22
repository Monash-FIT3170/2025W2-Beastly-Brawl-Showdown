import { AttackState } from "./actionState";
import { ConsumableState, EquipmentState, StoryItemState } from "./itemState";
import { MonsterState } from "./monsterState";
import { Status } from "/server/src/model/game/status/status";
import { StoryItem } from "/server/src/model/game/storyItem/storyItem";

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
  storyItems: StoryItemState[];

  attackState: AttackState;
  battleWon: number;
  abilitiesUsed: number;
  mostDamageDealt: number;
  successfulBlocks: number;
  criticalHitsDealt: number;

  animations: string[];
}
