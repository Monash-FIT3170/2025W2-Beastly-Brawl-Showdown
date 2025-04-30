class monster {
  type: string;
  hp: number;
  attack: number;
  ac: number;
  defence: number;
  attack_bonus: number;
  constructor(
    type: string,
    hp: number,
    attack: number,
    defend: number,
    bonus: number,
    defence: number
  ) {
    this.type = type;
    this.hp = hp;
    this.attack = attack;
    this.ac = defend;
    this.defence = defence;
    this.attack_bonus = bonus;
  }
  Action(
    action: boolean,
    enemy_action: boolean,
    enemy: monster,
    enemy_roll: number,
    crit_num: number
  ): void {
    /**
     * Inputs
     * action: boolean - Represents this characters action, true means attack, false defence
     * enemy_action: boolean, Represents enemy Action,  true means attack, false defence
     * enemy: monster, Pointer to the enemy monster class
     * enemy_roll: number, Number rolled by enemy
     * crit_num: number, Represents the number for hitting a crit
     */
    var AC: number = this.ac; //Establish AC as current allowing for flexibility with defence action
    if (!action) {
      // if defence is selcted increment ac and decrement defence turns
      AC += 2;
      this.defence -= 1;
    }
    if (enemy_action) {
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
    }
  }
}

class monsterX extends monster {
  constructor() {
    super("MonterX", 10, 10, 10, 10, 10);
  }
}
