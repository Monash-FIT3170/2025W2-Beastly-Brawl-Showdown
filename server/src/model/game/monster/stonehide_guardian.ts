import { Monster } from "./monster";
import { Tank } from "../archetype/tank";
import { GroundSlamAbilityAction } from "../action/ability/ground_slam";
import { MonsterIdentifier } from "/types/single/monsterState";

// Random monser for now
export class StonehideGuardian extends Monster {
  constructor() {
    super(
      MonsterIdentifier.STONEHIDE_GUARDIAN,
      "Stonehide Guardian",
      "A massive, armored creature resembling a rhinoceros with rocky skin. Known for its incredible defense and resilience, it can withstand powerful attacks.",
      new Tank(),
      new GroundSlamAbilityAction(),
      30,
      1,
      16
    );
  }
}
