import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class GroundSlamAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.GROUND_SLAM,
      "Ground Slam",
      "Can stun opponents with a powerful stomp canceling out all abilities and even dealing 3 damage.",
      1
    );
  }
  //Gets rid of all enemy players actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    affectedPlayer.clearActions() 
  }
  //deals small amount of damage
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);
    affectedPlayer.incHealth(-3);

    actingPlayer.addLog(
      `You have stunned ${affectedPlayer.getName()} with ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} has stunned you with ${this.getName()}`
    );
  }
}