import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";

export class ElementalBreathAbilityAction extends Action {
  // Attack that always lands on your opponent, even if they attempt to dodge the attack.
  constructor() {
    super(
      ActionIdentifier.ELEMENTAL_BREATH,
      "Elemental Breath",
      "Deal 5 damage to your opponent. If the opponent tries to dodge in the same turn, deal an additional 5 damage.",
      1
    );
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);

    // Deal 10 damage if the opponent is dodging, 5 damage otherwise
    if (affectedPlayer.getDodgingPosition()){
      affectedPlayer.incHealth(-10);
    } else {
      affectedPlayer.incHealth(-5);
    }

    // Log the action
    actingPlayer.addLog(
      `You used ${this.getName()}, dealing ${affectedPlayer.getDodgingPosition() ? 10 : 5} damage to ${affectedPlayer.getName()}.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${affectedPlayer.getDodgingPosition() ? 10 : 5} damage to you.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${affectedPlayer.getDodgingPosition() ? 10 : 5} damage to ${affectedPlayer.getName()}.`
    );

    //No status applied in this action/ability
    return {
      appliedStatus: {
        success: false
      }
    }
  }
}