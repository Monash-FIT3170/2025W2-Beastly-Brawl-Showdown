import { Monster } from "../monster";

class Attack {
  monster: Monster;

  constructor(monster: Monster) {
    this.monster = monster;
    this.Setup();
  }

  Setup() {
    this.monster.Defend();
  }
}
