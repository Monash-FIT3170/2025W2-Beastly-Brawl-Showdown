import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { ToxinTongue } from "./../action/ability/poisonAttack";
import { Attacker } from "../archetype/attacker";

export class PoisonFrog extends Monster {
  constructor() {
    super(
      MonsterIdentifier.POISON_FROG,
      "Poison Frog",
      "A small frog with a toxic touch. It ensnares its foes in a web of poison, leaving them vulnerable to its venomous attacks.",
      new Attacker(),
      new ToxinTongue(),
      20,
      4,
      10
    );
  }
}
