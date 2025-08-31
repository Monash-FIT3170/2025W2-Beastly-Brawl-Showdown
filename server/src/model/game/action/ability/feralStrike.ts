import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";


export class FeralStrikeAbilityAction extends Action {
  // Passive ability that increases critical hit rate by 15%
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Fight like a beast unleashed, your critical hit chance is permanently boosted to 15%.",
      0 // Passive abilities do not have uses
    );
  }


  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}


  public prepareAnimation(): string | [string, number] {
    return "Feral_Strike_Animation";
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
