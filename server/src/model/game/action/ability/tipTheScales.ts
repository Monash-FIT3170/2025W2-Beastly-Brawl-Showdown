import { Action } from "../action";
import { Player } from "../../player";
<<<<<<< HEAD
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
=======
import { ActionIdentifier } from "/types/single/actionState";
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
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

<<<<<<< HEAD
  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
=======
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
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
<<<<<<< HEAD

    return {
      appliedStatus: {
        success: false
      }
    }
=======
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
  }
}
