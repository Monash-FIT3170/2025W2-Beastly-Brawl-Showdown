import { Monster } from "./monster";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Attacker } from "../archetype/attacker";
import { ShadowLeapAbilityAction } from "../action/ability/shadowLeap";

export class PouncingBandit extends Monster {
  constructor(name: string = "Pouncing Bandit") {
    super(
      MonsterIdentifier.POUNCING_BANDIT,
      name,
      "An agile, purple beast with a knack for slipping away. It darts past attacks with ease, then pounces with ferocity to land its blow.",
      new Attacker(),
      new ShadowLeapAbilityAction(),
      20,
      10,
      12
    );
  }
}
