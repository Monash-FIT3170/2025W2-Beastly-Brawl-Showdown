import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier } from "/types/single/actionState";

export class AttackAction extends Action {
  private attackBonus: number;

  constructor(attackBonus: number) {
    super(ActionIdentifier.ATTACK, "Attack", "Attack an enemy", Infinity);
    this.attackBonus = attackBonus;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    // TODO: implement the dice logic here
    // roll a d20
    // var d20 = 0;

    // var damage = d20 + this.attackBonus;

    // if (damage >= affectedPlayer.getArmourClassStat()) {
    //   // hit
    //   affectedPlayer.incHealth(-5);
    // }
    affectedPlayer.incHealth(-5);
    actingPlayer.addLog(
      `You attacked ${affectedPlayer.getName()} and dealt 5 damage.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} attacked you and dealt 5 damage.`
    );
  }
}
