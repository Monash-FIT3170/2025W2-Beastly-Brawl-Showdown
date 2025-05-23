export enum MonsterIdentifier {
  STONEHIDE_GUARDIAN = "STONEHIDE_GUARDIAN",
  SHADOWFANG_PREDATOR = "SHADOWFANG_PREDATOR",
  MYSTIC_WYVERN = "MYSTIC_WYVERN",
}

export interface MonsterState {
  id: MonsterIdentifier;
  name: string;
  description: string;

  maxHealth: number;
  attackBonus: number;
  armourClass: number;
}
