import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class ShadowLeapAbilityAction extends Action {
  // Puts you in an evasive stance, allowing you to dodge an attack once per battle.
  constructor() {
    super(
      ActionIdentifier.SHADOW_LEAP,
      "Shadow Leap",
      "Enter an evasive stance, allowing you to dodge an attack in the current turn.",
      1
        );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // Set dodge to true
    actingPlayer.dodge();

    // Remove 1 use from each of the opponent's actions and remove the action if they can be dodged.
    affectedPlayer.getActions().forEach((action) => {
      if (action.getDodgeable()==true){
        action.incCurrentUse(-1);
        affectedPlayer.removeAction(action);
      }
    });

  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);

    // Log the action
    actingPlayer.addLog(
      `You used ${this.getName()}, preparing to dodge an attack.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} uses ${this.getName()}, preparing to dodge an attack.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} uses ${this.getName()}, preparing to dodge an attack.`
    );
  }
}
