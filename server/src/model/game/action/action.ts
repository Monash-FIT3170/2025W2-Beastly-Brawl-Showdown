import { Monster } from "../monster";
import { Defend } from "./defend";
import { Attack } from "./attack";

class Action {
  /**
   * Inputs
   * monster1: monster, Pointer to the enemy monster class
   * monster2: monster, Pointer to the enemy monster class
   * move1: boolean, true represents attack false represents defence action
   * move2: boolean, true represents attack false represents defence action
   * roll1: number, roll of player
   * roll2: number, roll of player
   */
  monster1: Monster;
  monster2: Monster;
  move1: boolean;
  move2: boolean;
  roll1: number;
  roll2: number;

  constructor(
    monster1: Monster,
    monster2: Monster,
    move1: boolean,
    move2: boolean,
    roll1: number,
    roll2: number
  ) {
    this.monster1 = monster1;
    this.monster2 = monster2;
    this.move1 = move1;
    this.move2 = move2;
    this.roll1 = roll1;
    this.roll2 = roll2;
    this.Setup();
  }

  Setup() {
    /**
     * Sets up the game logic based on the constructor values
     */
    if (!this.move1) {
      const defend = new Defend(this.monster1);
    }
    if (!this.move2) {
      const defend = new Defend(this.monster2);
    }

    if (this.move1) {
      const attack = new Attack(this.monster1, this.monster2, this.roll1);
    }
    if (this.move2) {
      const attack = new Attack(this.monster2, this.monster1, this.roll2);
    }
  }
}
