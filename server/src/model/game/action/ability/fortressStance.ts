import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";

export class FortressStanceAbilityAction extends Action {
  // Grants the user bonus AC for 1 round
  private armourBonus = 10;

  constructor() {
    super(
      ActionIdentifier.FORTRESS_STANCE,
      "Fortress Stance",
      "Increase your AC by 10 for 1 turn.",
      1
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}
  
  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);

    // Increase the AC of the player
    actingPlayer.incArmourClassStat(this.armourBonus);

    // Add logs
    actingPlayer.addLog(
      `You used ${this.getName()}, gaining ${this.armourBonus} AC for 1 turn.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, gaining ${this.armourBonus} AC for 1 turn.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, gaining ${this.armourBonus} AC for 1 turn.`
    );

    //Increasing AC should be a self-buff (as in Status) but with our current design I dont think it is...
    return {
      appliedStatus: {
        success: false
      }
    }
  }
}