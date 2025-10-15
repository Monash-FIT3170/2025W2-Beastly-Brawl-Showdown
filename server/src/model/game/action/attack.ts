import { Action } from "./action";
import { Player } from "../player";
import {
  ActionIdentifier,
  ActionResult,
  AttackState,
} from "/types/single/actionState";
import socket from "../../socket";
import { Shield } from "../status/shield";

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
    super(ActionIdentifier.ATTACK, "Attack", "Attack an enemy", Infinity, true);
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
    return ["attack", this.d20];
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    // Check if defender has a shield
    const shield = affectedPlayer.getStatusByName("Shield") as Shield;
    let shieldBroken = false;
    let damageDealt = 0;

    // Attack is calculated by adding dice roll and attack bonus.
    if (this.attackHit >= affectedPlayer.getArmourClassStat()) {
      console.log(
        `${actingPlayer.getName()}'s attack successful | Attack exceeds opponents armour: (${affectedPlayer.getArmourClassStat()} < ${
          this.attackHit
        }).`
      );

      // Check for a critical hit
      let critDamage = this.damage * 2;
      const isCrit =
        this.d20 >
        this.diceMax - Math.floor((this.rollRange * this.critRate) / 100);

      if (shield) {
        // Shield is present - check if attack can break it
        if (this.attackHit >= shield.getShieldStrength()) {
          // Attack is strong enough to break shield
          affectedPlayer.removeStatus(shield);
          shield.breakShield();
          shieldBroken = true;
          affectedPlayer.addAnimation("shield-broken");

          if (isCrit) {
            // Critical hit breaks shield AND deals damage
            affectedPlayer.incHealth(-this.damage);
            damageDealt = this.damage;
            affectedPlayer.addAnimation("crit");
            affectedPlayer.addAnimation("damage");
            // actingPlayer.addLog(
            //   `Critical hit! You broke ${affectedPlayer.getName()}'s shield and dealt ${
            //     this.damage
            //   } damage!`
            // );
            // affectedPlayer.addLog(
            //   `Critical hit! ${actingPlayer.getName()} broke your shield and dealt ${
            //     this.damage
            //   } damage!`
            // );
          } else {
            // Normal hit only breaks shield
            // actingPlayer.addLog(
            //   `You broke ${affectedPlayer.getName()}'s shield!`
            // );
            // affectedPlayer.addLog(
            //   `${actingPlayer.getName()} broke your shield!`
            // );
          }
        } else {
          // Attack hits but not strong enough to break shield
          // actingPlayer.addLog(
          //   `Your attack hit ${affectedPlayer.getName()}'s shield but wasn't strong enough to break it!`
          // );
          // affectedPlayer.addLog(
          //   `${actingPlayer.getName()}'s attack hit your shield but didn't break it!`
          // );
          affectedPlayer.addAnimation("shield-crack");
        }
      } else {
        // No shield - normal damage calculation
        if (isCrit) {
          affectedPlayer.addAnimation("crit");
          affectedPlayer.addAnimation("damage");
          affectedPlayer.incHealth(-critDamage);
          damageDealt = critDamage;
        } else {
          affectedPlayer.addAnimation("damage");
          affectedPlayer.incHealth(-this.damage);
          damageDealt = this.damage;
        }

        // actingPlayer.addLog(
        //   `${
        //     isCrit ? "Critical hit! " : ""
        //   }You attacked ${affectedPlayer.getName()}, dealing ${damageDealt} damage.`
        // );
        // affectedPlayer.addLog(
        //   `${
        //     isCrit ? "Critical hit! " : ""
        //   }${actingPlayer.getName()} attacked you, dealing ${damageDealt} damage.`
        // );
      }

      // Battle log for successful hit
      actingPlayer.addBattleLog(
        shieldBroken
          ? `${actingPlayer.getName()} broke ${affectedPlayer.getName()}'s shield${
              damageDealt > 0 ? ` and dealt ${damageDealt} damage` : ""
            }!`
          : damageDealt > 0
          ? `${
              isCrit ? "Critical hit! " : ""
            }${actingPlayer.getName()} attacked ${affectedPlayer.getName()}, dealing ${damageDealt} damage.`
          : `${actingPlayer.getName()}'s attack was blocked by ${affectedPlayer.getName()}'s shield.`
      );

      // Increment successful hit for front end
      actingPlayer.incSuccessfulHit(1);
      this.executeBattleEffect(actingPlayer, affectedPlayer, true);
    } else {
      // Attack missed entirely
      // actingPlayer.addLog(
      //   `You attacked ${affectedPlayer.getName()} and failed to hit.`
      // );
      // affectedPlayer.addLog(
      //   `${actingPlayer.getName()} tried to attack and failed to hit.`
      // );
      affectedPlayer.addBattleLog(
        `${affectedPlayer.getName()} has successfully avoided an attack`
      );

      affectedPlayer.incSuccessfulBlock(1);
      affectedPlayer.addAnimation("miss");
      this.executeBattleEffect(actingPlayer, affectedPlayer, false);
    }

    return {
      appliedStatus: {
        success: false,
      },
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
