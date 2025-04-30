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
  attackAction(enemy: monster): void {}
}

class monsterX extends monster {
  constructor() {
    super("MonterX", 10, 10, 10, 10, 10);
  }
}
