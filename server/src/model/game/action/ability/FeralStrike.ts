import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class FeralStrikeAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Deals extra damage on critical hits.",
      Infinity 
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.addLog(
      `Critcal damage increase due to ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} has increased crit dmg implemented action ${this.getName()}`
    );
  }
}