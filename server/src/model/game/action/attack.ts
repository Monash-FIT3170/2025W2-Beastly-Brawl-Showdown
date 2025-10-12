import { Action } from "./action";
import { Player } from "../player";
import {
  ActionIdentifier,
  ActionResult,
  AttackState,
} from "/types/single/actionState";
import socket from "../../socket";

export class AttackAction extends Action {
  private attackBonus: number;
  private attackHit: number = 0; // attackBonus + d20 roll
  private d20: number = 0;
  private diceMin: number;
  private diceMax: number;
  // private damage: number = 5; // Damage on a non-crit is 5
  private critRate: number; // % Chance to crit
  private rollRange: number = 0;

  constructor(
    attackBonus: number,
    critRate: number,
    diceMin: number = 1,
    diceMax: number = 20
  ) {
    super(ActionIdentifier.ATTACK, "Attack", "Attack an enemy", Infinity);
    this.attackBonus = attackBonus;
    this.diceMin = diceMin;
    this.diceMax = diceMax;
    this.critRate = critRate;
    this.rollRange = this.diceMax - this.diceMin + 1; // Determine the range of the dice roll
    this.damage = 5;
  }

  private rollDice(): number {
    // Generate a number within the range size, then add the minimum value to bring it within the actual range
    console.log(
      `diceMin: ${this.diceMin}, diceMax: ${this.diceMax}, rollRange: ${this.rollRange}`
    );

    const d20 = Math.floor(Math.random() * this.rollRange) + this.diceMin;
    // console.log(`Dice roll: ${d20}`);
    return d20;
  }

  public incrementDamageDealt(number: number): void {
    this.damage += number;
  }

  public incrementMinRoll(number: number): void {
    this.diceMin += number;
  }

  public incrementCritRate(number: number): void {
    this.critRate += number;
  }
  public getDiceRoll(): number {
    return this.d20;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // Rolling a d20 dice
    this.d20 = this.rollDice();
    this.attackBonus = actingPlayer.getAttackStat();
    this.attackHit = this.d20 + this.attackBonus;
    console.log(
      `${actingPlayer.getName()} Dice roll: ${this.d20} | Attack bonus: ${
        this.attackBonus
      }`
    );
  }

  // relies on prepare() method being called to roll the dice first.
  public prepareAnimation(): string | [string, number] {
    return ["roll_dice", this.d20];
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    let damage: number = 0;
    // Attack is calculated by adding dice roll and attack bonus.
    // If this exceeds the opponent's armour class, the attack is successful and we decrement their health by 5.
    if (this.attackHit >= affectedPlayer.getArmourClassStat()) {
      console.log(
        `${actingPlayer.getName()}'s attack successful | Attack exceeds opponents armour: (${affectedPlayer.getArmourClassStat()} < ${
          this.attackHit
        }).`
      );

      // Check for a critical hit
      // Calculate the crit range as a percentage of the dice roll range
      // Set the crit range starting from the maximum dice value and going down
      // Check if the dice roll is within the crit range
      // E.g. normal d20 roll is 1-20, with a crit rate of 10%, you need to roll 19 or 20 to crit
      let tmpDamage = this.damage;
      damage = this.damage
      const isCrit =
        this.d20 >
        this.diceMax - Math.floor((this.rollRange * this.critRate) / 100);
      if (isCrit) {
        this.damage *= 2; // Double the damage on a crit
        damage *= 2
        actingPlayer.incCriticalHitsDealt(1)
      }
      affectedPlayer.incHealth(-this.damage);

      // Log successful attack
      actingPlayer.addLog(
        `${
          isCrit ? "Critical hit! " : ""
        }You attacked ${affectedPlayer.getName()}, dealing ${
          this.damage
        } damage.`
      );

      affectedPlayer.addLog(
        `${
          isCrit ? "Critical hit! " : ""
        }${actingPlayer.getName()} attacked you, dealing ${this.damage} damage.`
      );

      actingPlayer.addBattleLog(
        `${
          isCrit ? "Critical hit! " : ""
        }${actingPlayer.getName()} attacked ${affectedPlayer.getName()}, dealing ${
          this.damage
        } damage.`
      );

      // Increment successful hit for front end
      actingPlayer.incSuccessfulHit(1);
      this.executeBattleEffect(actingPlayer, affectedPlayer, true);
    } else {
      // Log failed attack
      actingPlayer.addLog(
        `You attacked ${affectedPlayer.getName()} and failed to hit. `
      );

      affectedPlayer.addLog(
        `${actingPlayer.getName()} tried to attacked and failed to hit.`
      );

      affectedPlayer.addBattleLog(
        `${affectedPlayer.getName()} has successfully blocked an attack`
      );
      // Increment successful block for front end
      affectedPlayer.incSuccessfulBlock(1);

      this.executeBattleEffect(actingPlayer, affectedPlayer, false);
    }

    return {
      appliedStatus: {
        success: false,
      },
      damageDealt: {
        damage: damage
      }
    };
  }

  public getAttackState(): AttackState {
    return {
      attackDamage: this.damage,
      critRate: this.critRate,
      diceRange: this.diceMin,
    };
  }
}
