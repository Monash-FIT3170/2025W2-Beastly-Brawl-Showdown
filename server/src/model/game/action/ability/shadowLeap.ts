import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";
import { NullAction } from "../null";

export class ShadowLeapAbilityAction extends Action {
  // Puts you in an evasive stance, allowing you to dodge an attack once per battle.
  constructor() {
    super(
      ActionIdentifier.SHADOW_LEAP,
      "Shadow Leap",
      "Slip out of reach in a blur of fur, allowing you to dodge an attack in the current turn.",
      1
    );
  }

  public prepareAnimation(): string | [string, number] {
    return "Shadow_Leap_Animation";
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // Set dodge to true
    actingPlayer.dodge();

    // Remove 1 use from each of the opponent's actions and remove the action if they can be dodged.
    affectedPlayer.getActions().forEach((action) => {
      if (action.getDodgeable() == true) {
        action.incCurrentUse(-1);
        affectedPlayer.removeAction(action);
        const actingMessage = `${actingPlayer.getName()} dodged your attack!`;
        const affectedMessage = `You dodged ${affectedPlayer.getName()}'s attack!`;
        const battleLogMessage = `${actingPlayer.getName()} dodged ${affectedPlayer.getName()}'s attack!`;
        affectedPlayer.addAction(
          new NullAction(actingMessage, affectedMessage, battleLogMessage)
        ); //inputs are incorrect?
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
      `${actingPlayer.getName()} used ${this.getName()}, preparing to dodge an attack.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, preparing to dodge an attack.`
    );
  }
}
