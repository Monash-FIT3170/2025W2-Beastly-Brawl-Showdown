export interface PlayerState {
  id: string;
  name: string;

  currentHealth: number;
  currentAttackStat: number;
  currentArmourClassStat: number;
}

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

export enum ActionIdentifier {
  ATTACK = "ATTACK",
  DEFEND = "DEFEND",
  NULL = "NULL",
  FORTRESS_STANCE = "FORTRESS_STANCE",
  GROUND_SLAM = "GROUND_SLAM",
  FERAL_STRIKE = "FERAL_STRIKE",
  SHADOW_LEAP = "SHADOW_LEAP",
  ELEMENTAL_BREATH = "ELEMENTAL_BREATH",
  ARCANE_SHIELD = "ARCANE_SHIELD",
}

export interface ActionState {
  id: ActionIdentifier;
  name: string;
  description: string;
}
