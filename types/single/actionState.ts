import { StatusType } from "./statusType";

export enum ActionIdentifier {
  //BASE ACTIONS:
  ATTACK = "ATTACK",
  DEFEND = "DEFEND",
  CONSUME = "CONSUME",

  //ARCHETYPE ACTIONS:
  FORTRESS_STANCE = "FORTRESS_STANCE",
  FERAL_STRIKE = "FERAL_STRIKE",
  TIP_THE_SCALES = "TIP_THE_SCALES",
  SLIME_SUPPORT = "SLIME_SUPPORT",

  //ABILITY ACTIONS:
  GROUND_SLAM = "GROUND_SLAM",
  SHADOW_LEAP = "SHADOW_LEAP",
  PUFFER_BLAST = "PUFFER_BLAST",
  TOXIN_TONGUE = "TOXIN_TONGUE",
  ALLURING_LULLABY = "ALLURING_LULLABY",
  FLAME_LASH = "FLAME_LASH",

  //NULL ACTIONS:
  NULL = "NULL",
  LAKE_CURSE = "LAKE_CURSE",
  STUNNED = "STUNNED",
  SAND = "SAND",
}

export interface ActionState {
  id: ActionIdentifier;
  name: string;
  description: string;
  currentUse: number;
  maxUse: number;
}

export interface AttackState {
  attackDamage: number;
  critRate: number;
  diceRange: number;
}

//Holds information regarding the execution of the result
//this should display the effects of the executed action in a structured format
//can be used to expose more about information regarding execution of the action
//i.e. indicate whether it is a critical hit if action type is attack, dodging result,...
export interface ActionResult {
  appliedStatus: {
    success: boolean;
    type?: StatusType; //need to state whether it is StatusType.BUFF or StatusType.DEBUFF when success is true
    message?: string; //message is (optionally) for reasoning whether success is true or false
  };
  damageDealt?: {
    damage: number;
    message?: string;
  }
  usedAbility?: {
    isAbility: boolean;
    message?: string
  }
}
