import { Monster } from "../monster";

export class Defend {
  /**
   * Inputs
   * monster: monster, Pointer to the enemy monster class
   */
  monster: Monster;

  constructor(monster: Monster) {
    this.monster = monster;
    this.Setup();
  }

  Setup() {
    /**
     * Sets up the game logic based on the constructor values
     */
    this.monster.Defend();
  }
}
