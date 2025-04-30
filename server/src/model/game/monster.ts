class monster {
    rerolls = 0 
    attack = 5
    type: string;
    hp: number;
    ac: number;
    defence: number;
    bonus: number;
    constructor(type: string,hp: number,defend: number,bonus: number,defence: number) {
      this.type = type;
      this.hp = hp;
      this.ac = defend;
      this.defence = defence;
      this.bonus = bonus;
    }
    attackAction(enemy: monster): void {}
  }
  
