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
    // roll a d20
    var d20 = 0;

    var damage = d20 + this.attackBonus;

    if (damage >= affectedPlayer.getArmourClassStat()) {
      // hit
      affectedPlayer.incHealth(-5);
    }
  }
}
