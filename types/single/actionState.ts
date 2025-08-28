import { StatusType } from "./statusType";

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

//Holds information regarding the execution of the result
//this should display the effects of the executed action in a structured format
//can be used to expose more about information regarding execution of the action 
//i.e. indicate whether it is a critical hit if action type is attack, dodging result,...
export interface ActionResult {
  appliedStatus: {
    success: boolean, 
    type?: StatusType , //need to state whether it is StatusType.BUFF or StatusType.DEBUFF when success is true
    message?: string  //message is (optionally) for reasoning whether success is true or false
  } 
}