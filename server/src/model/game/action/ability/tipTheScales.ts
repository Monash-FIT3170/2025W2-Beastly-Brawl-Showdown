import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class TipTheScalesAbilityAction extends Action {
  private attackAction: AttackAction | null = null;
  private critRate: number;

  constructor(critRate: number) {
    super(
      ActionIdentifier.TIP_THE_SCALES,
      "Tip The Scales",
      "Attack with a biased D20, increasing the odds of success.",
      1
    );
    this.critRate = critRate;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    //initiates an attack with a biased d20
    this.attackAction = new AttackAction(
      actingPlayer.getAttackStat(),
      this.critRate,
      10
    );
    this.attackAction.prepare(actingPlayer, affectedPlayer);
  }

  public getDiceRoll(): number {
    if (this.attackAction) {
      return this.attackAction.getDiceRoll();
    }
    return 0;
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);

    // Log actions

    //TODO: update log writing to be better
    actingPlayer.addLog(
      `You used ${this.getName()}, attacking with an increased minimum roll of 10.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, attacking with an increased minimum roll of 10.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, attacking with an increased minimum roll of 10.`
    );

    this.attackAction?.execute(actingPlayer, affectedPlayer);

    return {
      appliedStatus: {
        success: false
      }
    }
  }
}
