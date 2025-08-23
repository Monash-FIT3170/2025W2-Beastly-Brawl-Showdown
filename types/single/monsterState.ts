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
  [MonsterIdentifier.SLIME, () => "DESERT"],
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

/**
 * Gets the biome for a given monster
 * @param monsterId The monster identifier (can be undefined)
 * @returns The biome string for the monster, or undefined if monster ID is undefined or not found
 */
export function getMonsterBiome(monsterId: MonsterIdentifier | undefined): string | undefined {
  if (!monsterId) {
    return undefined;
  }
  
  const biomeFunction = biomeMap.get(monsterId);
  return biomeFunction?.();
}

// Alternative version that throws an error for missing monsters
export function getMonsterBiomeStrict(monsterId: MonsterIdentifier): string {
  const biomeFunction = biomeMap.get(monsterId);
  
  if (!biomeFunction) {
    throw new Error(`Biome not found for monster: ${monsterId}`);
  }
  
  return biomeFunction();
}