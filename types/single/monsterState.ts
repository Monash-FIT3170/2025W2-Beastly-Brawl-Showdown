import { ActionState } from "./actionState";

export enum MonsterIdentifier {
  ROCKY_RHINO = "ROCKY_RHINO",
  POUNCING_BANDIT = "POUNCING_BANDIT",
  CINDER_TAIL = "CINDER_TAIL",
  FURIOUS_FLIPPER = "FURIOUS_FLIPPER",
  POISON_FROG = "POISON_FROG",
  CHARMER_COBRA = "CHARMER_COBRA",
  SLIME = "SLIME",
}

export enum ArchetypeIdentifier {
  BALANCED = "BALANCED",
  ATTACKER = "ATTACKER",
  DEFENDER = "DEFENDER",
  NEUTRAL = "NEUTRAL",
}


export const biomeMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => "FOREST"],
  [MonsterIdentifier.POUNCING_BANDIT, () => "FOREST"],
  [MonsterIdentifier.CINDER_TAIL, () => "BASALT"],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => "ARCTIC"],
  [MonsterIdentifier.POISON_FROG, () => "MARSH"],
  [MonsterIdentifier.CHARMER_COBRA, () => "DESERT"],
]);

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
