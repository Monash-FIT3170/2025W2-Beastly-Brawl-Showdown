import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class FortressStanceAbilityAction extends Action {
  private armourBonus = 3
  constructor() {
    super(
      ActionIdentifier.FORTRESS_STANCE,
      "Fortress Stance",
      "Increases AC for one round.",
      Infinity
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.incArmourClassStat(this.armourBonus)
    actingPlayer.addLog(
      `You have activated  ${this.getName()} + 3 AC!!!!`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} has temporarly increased his AC due to using ${this.getName()}`
    );
  }
}
