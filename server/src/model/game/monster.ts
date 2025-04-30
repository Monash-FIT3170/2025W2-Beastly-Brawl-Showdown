class monster {
  rerolls = 0 
  type: string;
  hp: number;
  attack = 5
  ac: number;
  defence: number;
  attack_bonus: number;
  constructor(
    type: string,
    hp: number,
    defend: number,
    bonus: number,
    defence: number
  ) {
    this.type = type;
    this.hp = hp;
    this.ac = defend;
    this.defence = defence;
    this.attack_bonus = bonus;
  }
  Action(
    action: boolean,
    enemy_action: boolean,
    enemy: monster,
    enemy_roll: number
  ): void {
    /**
     * Inputs
     * action: boolean - Represents this characters action, true means attack, false defence
     * enemy_action: boolean, Represents enemy Action,  true means attack, false defence
     * enemy: monster, Pointer to the enemy monster class
     * enemy_roll: number, Number rolled by enemy
     */
    var AC: number = this.ac;
    if (!action) {
      AC += 2;
      this.defence -= 1;
    }
    if (enemy_action) {
      if (enemy_roll + enemy.attack_bonus > AC) {
        var damage: number = 5;
        if (enemy_roll == 20) {
          damage = 10;
        }
        this.hp -= damage;
      }
    }
  }
}


  
