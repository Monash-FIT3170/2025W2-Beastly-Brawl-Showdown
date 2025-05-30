import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class ArcaneShieldAbilityAction extends Action {
  //sets us a biased dice for better chances by preparing and excecuting an attack with a higher minimum dice roll
  private strike = new AttackAction(7,10);

  constructor() {
    super(
      ActionIdentifier.ARCANE_SHIELD,
      "Arcane Shield",
      "Rolls a biased dice to better your odds at a hit",
      1
    );
  }


  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.prepare(actingPlayer,affectedPlayer)
  }
  //excecutes modified attack action
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);
    this.strike.execute(actingPlayer,affectedPlayer)
    actingPlayer.addLog(
      `Biased dice has been rolled for an attack using ${this.getName()}`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} has used ${this.getName()} rolling a biased dice for their attack`
    );
  }
}
