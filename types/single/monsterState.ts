export enum MonsterIdentifier {
  STONEHIDE_GUARDIAN = "STONEHIDE_GUARDIAN",
  SHADOWFANG_PREDATOR = "SHADOWFANG_PREDATOR",
  MYSTIC_WYVERN = "MYSTIC_WYVERN",
  VICIOUS_VIPER = " VICIOUS_VIPER",
}

export interface MonsterState {
  id: MonsterIdentifier;
  name: string;
  description: string;

  maxHealth: number;
  attackBonus: number;
  armourClass: number;
}
