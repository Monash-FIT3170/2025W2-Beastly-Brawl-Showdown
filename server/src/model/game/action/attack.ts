import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier } from "/types/single/actionState";
import socket from "../../socket";

export class AttackAction extends Action {
  private attackBonus: number;
  private damage: number;

  constructor(attackBonus: number) {
    super(ActionIdentifier.ATTACK, "Attack", "Attack an enemy");
    this.attackBonus = attackBonus;
  }

  public getDamage(): number {
    return this.damage;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    // TODO: implement the dice logic here
    const d20 = Math.floor(Math.random() * 20) + 1;
    this.damage = d20 + this.attackBonus;
    affectedPlayer.incHealth(-5); // replace with this.damage

    actingPlayer.addLog(
      `You attacked ${affectedPlayer.getName()} and dealt ${this.damage} damage.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} attacked you and dealt 5 damage.`
    );
  }
}
