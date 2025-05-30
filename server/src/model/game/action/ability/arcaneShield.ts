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
      "Can reroll one d20 roll once per battle",
      1
    );
  }


  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.prepare(actingPlayer,affectedPlayer)
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike.execute(actingPlayer,affectedPlayer)
    actingPlayer.addLog(
      `Biased dice has been rerolled for an attack using ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} rerolled their dice, implemented action ${this.getName()} and obtaining a biased attack`
    );
  }
}
