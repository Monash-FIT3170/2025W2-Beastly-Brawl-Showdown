import { Monster } from "../monster";

export class Defend {
  monster: Monster;

  constructor(monster: Monster) {
    this.monster = monster;
    this.Setup();
  }

  Setup() {
    this.monster.Defend();
  }
}
