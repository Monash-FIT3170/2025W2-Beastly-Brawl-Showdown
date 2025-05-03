class Action {
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
  }

  Setup() {
    if (!this.move1) {
    }
  }
}
