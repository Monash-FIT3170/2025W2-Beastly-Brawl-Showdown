import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";


export class FeralStrikeAbilityAction extends Action {
  // Passive ability that increases critical hit rate by 15%
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Increase your critical hit rate by 15%.",
      0 // Passive abilities do not have uses
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {

  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    //Nothing happens here
    return {
      appliedStatus: {
        success: false
      }
    }
  }
}
