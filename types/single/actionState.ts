export enum ActionIdentifier {
  ATTACK = "ATTACK",
  DEFEND = "DEFEND",
  NULL = "NULL",
  FORTRESS_STANCE = "FORTRESS_STANCE",
  GROUND_SLAM = "GROUND_SLAM",
  FERAL_STRIKE = "FERAL_STRIKE",
  SHADOW_LEAP = "SHADOW_LEAP",
  ELEMENTAL_BREATH = "ELEMENTAL_BREATH",
  TIP_THE_SCALES = "TIP_THE_SCALES",
  STUNNED = "STUNNED",
  TRIPLE_FISH_LAUNCH = "TRIPLE_FISH_LAUNCH",
  POISON_ATTACK = "POISON_ATTACK",
  ALLURING_LULLABY = "ALLURING_LULLABY",
}

export interface ActionState {
  id: ActionIdentifier;
  name: string;
  description: string;
  currentUse: number;
  maxUse: number;
}
