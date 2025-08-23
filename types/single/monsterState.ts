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


// Background persistence state
let lastValidBackground: string | null = null;

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

/**
 * Gets the biome for a monster and persists it for future use when monster is defeated
 * @param monsterId The monster identifier (can be undefined)
 * @param defaultBiome The default biome to use if no monster and no previously saved background
 * @returns The current monster's biome, or the last valid biome, or the default
 */
export function getPersistedMonsterBiome(
  monsterId: MonsterIdentifier | undefined, 
  defaultBiome: string = "FOREST"
): string {
  const currentBiome = getMonsterBiome(monsterId);
  
  // If we have a current biome, save it and return it
  if (currentBiome) {
    lastValidBackground = currentBiome;
    return currentBiome;
  }
  
  // If no current biome, return the last valid one or default
  return lastValidBackground || defaultBiome;
}

/**
 * Resets the persisted background (useful for starting new adventures)
 */
export function resetPersistedBackground(): void {
  lastValidBackground = null;
}

/**
 * Gets the biome for a given monster with a fallback default
 * @param monsterId The monster identifier (can be undefined)
 * @param defaultBiome The default biome to return if monster ID is undefined or not found (default: "FOREST")
 * @returns The biome string for the monster, or the default biome
 */
export function getMonsterBiomeWithDefault(
  monsterId: MonsterIdentifier | undefined, 
  defaultBiome: string = "FOREST"
): string {
  const biome = getMonsterBiome(monsterId);
  return biome ?? defaultBiome;
}

// Alternative version that throws an error for missing monsters
export function getMonsterBiomeStrict(monsterId: MonsterIdentifier): string {
  const biomeFunction = biomeMap.get(monsterId);
  
  if (!biomeFunction) {
    throw new Error(`Biome not found for monster: ${monsterId}`);
  }
  
  return biomeFunction();
}