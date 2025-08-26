import { ActionState } from "./actionState";

export enum MonsterIdentifier {
  ROCKY_RHINO = "ROCKY_RHINO",
  POUNCING_BANDIT = "POUNCING_BANDIT",
  CINDER_TAIL = "CINDER_TAIL",
  FURIOUS_FLIPPER = "FURIOUS_FLIPPER",
  POISON_POGO = "POISON_POGO",
  CHARMER_COBRA = "CHARMER_COBRA",
  SLIME = "SLIME",
}

export enum ArchetypeIdentifier {
  BALANCED = "BALANCED",
  ATTACKER = "ATTACKER",
  DEFENDER = "DEFENDER",
  NEUTRAL = "NEUTRAL",
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
