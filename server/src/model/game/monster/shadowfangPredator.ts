import { Monster } from "./monster";
import { Dps } from "../archetype/dps";
import { ShadowLeapAbilityAction } from "../action/ability/ShadowLeap";
import { MonsterIdentifier } from "/types/single/monsterState";

// Random monser for now
export class shadowfangPredetor extends Monster {
  constructor() {
    super(
      MonsterIdentifier.SHADOWFANG_PREDATOR,
      "Shadowfang Predator",
      " A sleek, agile beast resembling a wolf or panther, cloaked in shadows. Its speed and ferocity make it a deadly opponent.",
      new Dps(),
      new ShadowLeapAbilityAction(),
      20,
      6,
      12
    );
  }
}