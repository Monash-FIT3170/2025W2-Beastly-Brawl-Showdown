import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
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
    return "shadow-leap";
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
        const nullAction = new NullAction(
          "Attack Dodged",
          ActionIdentifier.NULL,
          actingMessage,
          affectedMessage,
          battleLogMessage
        );
        nullAction.updateAnimation([
          "attack",
          Math.floor(Math.random() * 15) + 5, //TODO: update roll
        ]);
        affectedPlayer.addAction(nullAction);
      }
    });
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
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

    return {
      appliedStatus: {
        success: false,
      },
    };
  }
}
