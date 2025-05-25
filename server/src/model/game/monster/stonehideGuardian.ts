import { Monster } from "./monster";
import { Tank } from "../archetype/tank";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
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
      16,
      "StonehideGuardian"
    );
  }
}

export class MysticWyvern extends Monster {
  constructor() {
    super(
      MonsterIdentifier.MYSTIC_WYVERN,
      "mystic wyvern",
      "mystic wyvern",
      new Tank(),
      new GroundSlamAbilityAction(),
      30,
      1,
      16,
      "MysticWyvern"
    );
  }
}

export class ShadowFangPredator extends Monster {
  constructor() {
    super(
      MonsterIdentifier.SHADOWFANG_PREDATOR,
      "shadowfang predator",
      "shadowfang",
      new Tank(),
      new GroundSlamAbilityAction(),
      30,
      1,
      16,
      "ShadowFangPredator"
    );
  }
}
