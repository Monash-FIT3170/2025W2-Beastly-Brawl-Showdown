import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class GroundSlamAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.GROUND_SLAM,
      "Ground Slam",
      "Can stun opponents with a powerful stomp.",
      Infinity
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    affectedPlayer.clearActions() 
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    affectedPlayer.incHealth(-3);

    actingPlayer.addLog(
      `You have stunned ${affectedPlayer.getName()} with ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} has stunned you with ${this.getName()}`
    );
  }
}