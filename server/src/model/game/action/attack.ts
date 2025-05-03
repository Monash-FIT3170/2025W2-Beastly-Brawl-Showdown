import { Monster } from "../monster";

export class Attack {
  /**
   * Inputs
   * attacker: monster, Pointer to the enemy monster class
   * defender: monster, Pointer to the enemy monster class
   * roll: number, number representing player roll
   */
  attacker: Monster;
  defender: Monster;
  roll: number;

  constructor(attacker: Monster, defender: Monster, roll: number) {
    this.attacker = attacker;
    this.defender = defender;
    this.roll = roll;
    this.Setup();
  }

  Setup() {
    /**
     * Sets up the game logic based on the constructor values
     */
    this.defender.Action(this.attacker, this.roll, this.attacker.crit);
  }
}
