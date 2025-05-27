import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class FeralStrikeAbilityAction extends Action {
  private strike = new AttackAction(7,1);
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Deals extra damage on critical hits.",
      Infinity 
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.prepare(actingPlayer,affectedPlayer)
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.execute(actingPlayer,affectedPlayer)
    actingPlayer.addLog(
      `Critcal damage increase due to ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} has increased crit dmg implemented action ${this.getName()}`
    );
  }
}