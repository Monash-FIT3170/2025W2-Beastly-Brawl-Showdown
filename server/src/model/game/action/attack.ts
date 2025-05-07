import { Action } from "./action";
import { Player } from "../player";

export class AttackAction extends Action {
  private attackBonus: number;

  constructor(attackBonus: number) {
    super("Attack", "Attack an enemy");
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
    console.log("AttackAction executed");
    affectedPlayer.incHealth(-5);
  }
}
