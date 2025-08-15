import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";
import { get } from "http";

export class TipTheScalesAbilityAction extends Action {
  private attackAction: AttackAction | null = null;

  constructor() {
    super(
      ActionIdentifier.TIP_THE_SCALES,
      "Tip The Scales",
      "Attack with a biased D20, increasing the odds of success.",
      1
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    //initiates an attack with a biased d20
    var critrate =
      actingPlayer.getMonster()?.getArchetype().getCritRate() ?? 10;
    this.attackAction = new AttackAction(
      actingPlayer.getAttackStat(),
      critrate,
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

  public prepareAnimation(): string | [string, number] {
    if (this.attackAction) {
      const diceRollNumber = this.getDiceRoll();
      return ["roll_dice", diceRollNumber];
    }
    return "roll_dice";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
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
  }
}
