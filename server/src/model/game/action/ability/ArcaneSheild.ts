import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";

export class ArcaneSheildAbilityAction extends Action {
  
  private armourBonus = 0
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Arcane Sheild",
      "Can reroll one d20 roll once per battle",
      1
    );
  }


  private rollDice(): number {
    var d20 = 0
    console.log(`Dice roll: ${d20}`);
    var d20 = Math.floor(Math.random() * 20);
    return d20;
  }

  public getDiceRoll(): number {
    return this.rollDice();
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.armourBonus = this.getDiceRoll();
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.incArmourClassStat(this.armourBonus);
    actingPlayer.addLog(
      `dice has been rerolled to gain sheild with  ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} rerolled their di, implemented action ${this.getName()} and gaining sheild`
    );
  }
}