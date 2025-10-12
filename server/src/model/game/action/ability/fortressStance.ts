import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";

export class FortressStanceAbilityAction extends Action {
  // Grants the user bonus AC for 1 round
  private armourBonus = 20;

  constructor() {
    super(
      ActionIdentifier.FORTRESS_STANCE,
      "Fortress Stance",
      "You tense to prepare for an attack. Your hide becomes tougher than iron. Gain 20 AC",
      1
    );
  }

  public prepareAnimation(): string | [string, number] {
    return "fortress-stance";
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
      `${actingPlayer.getName()} used ${this.getName()}, gaining ${
        this.armourBonus
      } AC for 1 turn.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, gaining ${
        this.armourBonus
      } AC for 1 turn.`
    );

    this.executeBattleEffect(actingPlayer, affectedPlayer, true);

    //Increasing AC should be a self-buff (as in Status) but with our current design I dont think it is...
    return {
      appliedStatus: {
        success: false,
      },
    };
  }
}
