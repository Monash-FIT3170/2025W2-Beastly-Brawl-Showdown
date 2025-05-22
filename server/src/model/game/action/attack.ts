import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier } from "/types/single/actionState";
import socket from "../../socket";

export class AttackAction extends Action {
  private attackBonus: number;
  private damage: number;

  constructor(attackBonus: number) {
    super(ActionIdentifier.ATTACK, "Attack", "Attack an enemy", Infinity);
    this.attackBonus = attackBonus;
  }

  public getDamage(): number {
    return this.damage;
  }

  public getDiceRoll(): number {
    const d20 = Math.floor(Math.random() * 20);
    return d20;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    
    // Rolling a d20 dice 
    const d20 = this.getDiceRoll();
    this.damage = d20 + this.attackBonus; 
    console.log(`Dice roll: ${d20} + Attack bonus: ${this.attackBonus}`);

    // Dice roll is added to bonus attack. If this is greater than opponents armour, then we do (total damage - opponents armour).
    // This is what we subtract from the opponent's HP. 
    if (this.damage > affectedPlayer.getMonster().getArmourClass()) {
      console.log(`New damage: ${this.damage} - ${affectedPlayer.getMonster().getArmourClass()}`);

      this.damage = this.damage - affectedPlayer.getMonster().getArmourClass();

      // New damage is
      console.log(`Attack: ${this.damage}`);
      affectedPlayer.incHealth(-this.damage);

      // Log successful attack
      actingPlayer.addLog(`You attacked ${affectedPlayer.getName()} and dealt ${this.damage} damage.`);
      actingPlayer.incSuccessfulHit(1);
    } else {
      // Log failed attack
      actingPlayer.addLog(`You attacked but it fails`);
      affectedPlayer.addLog('You have successfully blocked an attack from your opponent');
      affectedPlayer.incSuccessfulBlock(1);
    }
  }
}
