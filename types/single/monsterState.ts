import { ActionState } from "./actionState";

export enum MonsterIdentifier {
  ROCKY_RHINO = "ROCKY_RHINO",
  POUNCING_BANDIT = "POUNCING_BANDIT",
  CINDER_TAIL = "CINDER_TAIL",
  KILLING_BLUEY = "KILLING_BLUEY",
  POISON_FROG = "POISON_FROG",
  CHARMER_COBRA = "CHARMER_COBRA",
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
