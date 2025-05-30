import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class FeralStrikeAbilityPassive extends Action {
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Increases your critical hit rate by 15%.",
      0 // Passive abilities do not have uses
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.prepare(actingPlayer,affectedPlayer)
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
