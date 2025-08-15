import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

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

  public prepareAnimation(): string | [string, number] {return "Fortress_Stance_Animation"}
  
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
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
  }
}