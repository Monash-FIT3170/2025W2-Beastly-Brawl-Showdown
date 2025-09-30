import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { ToxinTongue } from "../action/ability/toxinTongue";
import { Attacker } from "../archetype/attacker";

export class PoisonPogo extends Monster {
  constructor(name: string = "Poison Pogo") {
    super(
      MonsterIdentifier.POISON_POGO,
      name,
      "A toxic frog that leaps with eerie glee. Its grotesque tongue spreads venom, leaving enemies weak and rotting from within.",
      new Attacker(),
      new ToxinTongue(),
      20,
      4,
      10
    );
  }
}
