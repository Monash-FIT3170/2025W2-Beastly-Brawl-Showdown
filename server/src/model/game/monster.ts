export class Monster {
  type: string;
  hp: number;
  attack = 5;
  ac: number;
  defence: number;
  attack_bonus: number;
  defending: boolean;
  crit: number;
  constructor(
    type: string,
    hp: number,
    defend: number,
    bonus: number,
    defence: number,
    crit: number = 20
  ) {
    this.type = type;
    this.hp = hp;
    this.ac = defend;
    this.defence = defence;
    this.attack_bonus = bonus;
    this.defending = false;
    this.crit = crit;
  }
  Action(enemy: Monster, enemy_roll: number, crit_num: number): void {
    /**
     * Inputs
     * enemy: monster, Pointer to the enemy monster class
     * enemy_roll: number, Number rolled by enemy
     * crit_num: number, Represents the number for hitting a crit
     */
    var AC: number = this.ac; //Establish AC as current allowing for flexibility with defence action
    if (this.defending) {
      // if defence is selcted increment ac and decrement defence turns
      AC += 2;
    }

    // When enemy is attacking
    if (enemy_roll + enemy.attack_bonus > AC) {
      //Checks to see if enemy hits
      var damage: number = 5;
      if (enemy_roll >= crit_num) {
        //Critical damage
        damage = 10;
      }
      this.hp -= damage;
    }

    this.defending = false;
  }
  Defend(): void {
    this.defending = true;
    this.defence -= 1;
  }
}
