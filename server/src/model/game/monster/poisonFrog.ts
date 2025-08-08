import { Warrior } from "./../archetype/warrior";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { PoisonAttack } from "./../action/ability/poisonAttack";

export class PoisonFrog extends Monster {
  constructor() {
    super(
      MonsterIdentifier.POISON_FROG,
      "Poison Frog",
      "A small frog with a toxic touch. It ensnares its foes in a web of poison, leaving them vulnerable to its venomous attacks.",
      new Warrior(),
      new PoisonAttack(),
      20,
      4,
      10
    );
  }
}
