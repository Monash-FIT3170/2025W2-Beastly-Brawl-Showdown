import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class FortressStanceAbilityAction extends Action {
  private armourBonus = 8
  constructor() {
    super(
      ActionIdentifier.FORTRESS_STANCE,
      "Fortress Stance",
      "Increases AC for one round.",
      1
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}
  //gives player an armour bonus for the round
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.incArmourClassStat(this.armourBonus)
    actingPlayer.addLog(
      `You have activated ${this.getName()} + 8 AC!!!!`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} has temporarly increased his AC by using ${this.getName()}`
    );
  }
}