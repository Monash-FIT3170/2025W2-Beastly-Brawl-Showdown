import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Tank } from "../archetype/tank";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";

export class MysticWyvern extends Monster {
  constructor() {
    super(
      MonsterIdentifier.MYSTIC_WYVERN,
      "Mysteric Wyvern",
      "A dragon-like creature with vibrant scales and a balanced physique. It possesses both offensive and defensive capabilities, making it versatile in battle.",
      new Tank(),
      new GroundSlamAbilityAction(),
      25,
      2,
      14
    );
  }
}
