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
   */
  monster1: Monster;
  monster2: Monster;
  move1: boolean;
  move2: boolean;

  constructor(
    monster1: Monster,
    monster2: Monster,
    move1: boolean,
    move2: boolean
  ) {
    this.monster1 = monster1;
    this.monster2 = monster2;
    this.move1 = move1;
    this.move2 = move2;
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
      const roll = 2; //ADD ROLL MECHANICS HERE
      const attack = new Attack(this.monster1, this.monster2, roll);
    }
    if (this.move2) {
      const roll = 2; //ADD ROLL MECHANICS HERE
      const attack = new Attack(this.monster2, this.monster1, roll);
    }
  }
}
