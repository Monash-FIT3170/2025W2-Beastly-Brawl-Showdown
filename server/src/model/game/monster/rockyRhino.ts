import { Monster } from "./monster";
import { Defender } from "../archetype/defender";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { MonsterIdentifier } from "/types/single/monsterState";

export class RockyRhino extends Monster {
  constructor() {
    super(
      MonsterIdentifier.ROCKY_RHINO,
      "Rocky Rhino",
      "A massive, armored creature resembling a rhinoceros with rocky skin. Known for its incredible defense and resilience, it can withstand powerful attacks.",
      new Defender(),
      new GroundSlamAbilityAction(),
      30,
      4,
      16
    );
  }
}
