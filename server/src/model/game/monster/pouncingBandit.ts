import { Monster } from "./monster";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Attacker } from "../archetype/attacker";
import { ShadowLeapAbilityAction } from "../action/ability/shadowLeap";

export class PouncingBandit extends Monster {
  constructor() {
    super(
      MonsterIdentifier.POUNCING_BANDIT,
      "Pouncing Bandit",
      "A sleek, agile beast resembling a wolf or panther, cloaked in shadows. Its speed and ferocity make it a deadly opponent.",
      new Attacker(),
      new ShadowLeapAbilityAction(),
      20,
      10,
      12
    );
  }
}
