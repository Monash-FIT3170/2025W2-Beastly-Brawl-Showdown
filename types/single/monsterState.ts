import { ActionState } from "./actionState";

export enum MonsterIdentifier {
  ROCKY_RHINO = "ROCKY_RHINO",
  POUNCING_BANDIT = "POUNCING_BANDIT",
  CINDER_TAIL = "CINDER_TAIL",
}

export interface MonsterState {
  id: MonsterIdentifier;
  name: string;
  description: string;

  maxHealth: number;
  attackBonus: number;
  armourClass: number;

  possibleActions: ActionState[];
}
