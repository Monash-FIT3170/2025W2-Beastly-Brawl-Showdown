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
  attackAction(
    action: boolean,
    enemy_action: boolean,
    enemy: monster,
    enemy_roll: number
  ): void {
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

class monsterX extends monster {
  constructor() {
    super("MonterX", 10, 10, 10, 10, 10);
  }
}
