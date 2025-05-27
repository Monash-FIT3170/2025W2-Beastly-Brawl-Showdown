import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class ArcaneSheildAbilityAction extends Action {
  private strike = new AttackAction(7,2);
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Arcane Sheild",
      "Can reroll one d20 roll once per battle",
      1
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.prepare(actingPlayer,affectedPlayer)
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.prepare(actingPlayer,affectedPlayer)
    actingPlayer.addLog(
      `dice has been rerolled with  ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} rerolled their di, implemented action ${this.getName()}`
    );
  }
}