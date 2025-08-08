import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class TipTheScalesAbilityAction extends Action {
  private strike: AttackAction | null = null;

  constructor() {
    super(
      ActionIdentifier.TIP_THE_SCALES,
      "Tip The Scales",
      "Use a biased d20, increasing the minimum roll to 10 for your next attack.",
      1
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.strike = new AttackAction(actingPlayer.getAttackStat(), 10);
    this.strike.prepare(actingPlayer,affectedPlayer);
  }


  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);
    this.strike?.execute(actingPlayer,affectedPlayer)

    // Log actions
    actingPlayer.addLog(
      `You used ${this.getName()}, increasing the minimum roll to 10 for your next attack.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, increasing the minimum roll to 10 for their next attack.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, increasing the minimum roll to 10 for their next attack.`
    );
  }
}
