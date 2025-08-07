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
  STUNNED = "STUNNED",
}

export interface ActionState {
  id: ActionIdentifier;
  name: string;
  description: string;
  currentUse: number;
  maxUse: number;
}
