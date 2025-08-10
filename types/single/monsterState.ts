import { ActionState } from "./actionState";

export enum MonsterIdentifier {
  ROCKY_RHINO = "ROCKY_RHINO",
  POUNCING_BANDIT = "POUNCING_BANDIT",
  CINDER_TAIL = "CINDER_TAIL",
  FURIOUS_FLIPPER = "FURIOUS_FLIPPER",
  POISON_FROG = "POISON_FROG",
  CHARMER_COBRA = "CHARMER_COBRA",
}

export enum ArchetypeIdentifier {
  BALANCED = "BALANCED",
  ATTACKER = "ATTACKER",
  DEFENDER = "DEFENDER",
}

export interface MonsterState {
  id: MonsterIdentifier;
  archetypeId: ArchetypeIdentifier;
  name: string;
  description: string;

  maxHealth: number;
  attackBonus: number;
  armourClass: number;

  possibleActions: ActionState[];
}

export interface ArchetypeInfo {
  id: ArchetypeIdentifier;
  name: string;
  ability: string;
  abilityDesc: string;
}
