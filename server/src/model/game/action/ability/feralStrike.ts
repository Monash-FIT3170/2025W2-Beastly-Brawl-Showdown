import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class FeralStrikeAbilityAction extends Action {

  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Deals extra damage on critical hits.",
      1
    );
  }
  //just increasing attack bonus of player for the turn
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    var bonus = actingPlayer.getAttackStat();
    bonus += 3
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.addLog(
      `Critcal damage increase due to ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} has used ${this.getName()} increasing their critical damage`
    );
  }
}
