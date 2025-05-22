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

    // Attack is calculated by adding dice roll and attack bonus. 
    // If this exceeds the opponent's armour class, the attack is successful and we decrement their health by 5. 
    if (this.damage > affectedPlayer.getMonster().getArmourClass()) {
      console.log(`Attack successful | Attack exceeds opponents armour: (${affectedPlayer.getMonster().getArmourClass()} < ${this.damage}).`);
      affectedPlayer.incHealth(-5);

      // Log successful attack
      actingPlayer.addLog(`You attacked ${affectedPlayer.getName()} and dealt 5 damage.`);
    } else {
      // Log failed attack
      actingPlayer.addLog(`You attacked ${affectedPlayer.getName()} and dealt 0 damage.`);
    }
  }
}
