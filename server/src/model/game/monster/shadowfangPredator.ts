import { Monster } from "./monster";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Warrior } from "../archetype/warrior";
import { ShadowLeapAbilityAction } from "../action/ability/shadowLeap";

export class ShadowfangPredator extends Monster {
  constructor() {
    super(
      MonsterIdentifier.SHADOWFANG_PREDATOR,
      "Shadowfang Predator",
      "A sleek, agile beast resembling a wolf or panther, cloaked in shadows. Its speed and ferocity make it a deadly opponent.",
      new Warrior(),
      new ShadowLeapAbilityAction(),
      30,
      1,
      16
    );
  }
}
