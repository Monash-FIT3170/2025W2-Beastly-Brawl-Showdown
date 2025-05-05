import { Action } from "./action";
import { Player } from "../player";

export class AttackAction extends Action {
  private attackPower: number;

  constructor(attackPower: number = 10) {
    super("Attack", "Attack an enemy");
    this.attackPower = attackPower;
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
