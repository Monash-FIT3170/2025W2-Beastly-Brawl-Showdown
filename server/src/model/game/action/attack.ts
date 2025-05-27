import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier } from "/types/single/actionState";
import socket from "../../socket";

export class AttackAction extends Action {
  private attackBonus: number;
  private damage: number;
  private d20: number;

  constructor(attackBonus: number) {
    super(ActionIdentifier.ATTACK, "Attack", "Attack an enemy", Infinity);
    this.attackBonus = attackBonus;
  }

  public getDamage(): number {
    return this.damage;
  }

  private rollDice(): number {
    var d20 = Math.floor(Math.random() * 20);
    console.log(`Dice roll: ${d20}`);
    return d20;
  }

  public getDiceRoll(): number {
    return this.d20;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // Rolling a d20 dice
    this.d20 = this.rollDice();
    this.damage = this.d20 + this.attackBonus;
    console.log(`Dice roll: ${this.d20} | Attack bonus: ${this.attackBonus}`);
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    // Attack is calculated by adding dice roll and attack bonus.
    // If this exceeds the opponent's armour class, the attack is successful and we decrement their health by 5.
    if (this.damage > affectedPlayer.getMonster().getArmourClass()) {
      console.log(
        `Attack successful | Attack exceeds opponents armour: (${affectedPlayer
          .getMonster()
          .getArmourClass()} < ${this.damage}).`
      );
      affectedPlayer.incHealth(-5);

      // Log successful attack
      actingPlayer.addLog(
        `You attacked ${affectedPlayer.getName()} and dealt 5 damage.`
      );
      actingPlayer.addBattleLog(
        `${actingPlayer.getName()} attacked ${affectedPlayer.getName()} and dealt 5 damage.`
      );
      // Increment successful hit for front end
      actingPlayer.incSuccessfulHit(1);
    } else {
      // Log failed attack
      actingPlayer.addLog(
        `You attacked ${affectedPlayer.getName()} and failed to hit. `
      );
      affectedPlayer.addBattleLog(
        `${affectedPlayer.getName()} has successfully blocked an attack`
      );
      // Increment successful block for front end
      affectedPlayer.incSuccessfulBlock(1);
    }
  }
}
