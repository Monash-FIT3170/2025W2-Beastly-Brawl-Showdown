import { Monster } from "../monster";

export class Attack {
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
    this.defender.Action(this.attacker, this.roll, this.attacker.crit);
  }
}
