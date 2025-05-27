import { Monster } from "./monster";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Tank } from "../archetype/tank";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";

export class ShadowfangPredator extends Monster {
  constructor() {
    super(
      MonsterIdentifier.SHADOWFANG_PREDATOR,
      "Shadowfang Predator",
      "A sleek, agile beast resembling a wolf or panther, cloaked in shadows. Its speed and ferocity make it a deadly opponent.",
      new Tank(),
      new GroundSlamAbilityAction(),
      30,
      1,
      16
    );
  }
}
