import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Balanced } from "../archetype/balanced";
import { ElementalBreathAbilityAction } from "../action/ability/elementalBreath";

export class MysticWyvern extends Monster {
  constructor() {
    super(
      MonsterIdentifier.MYSTIC_WYVERN,
      "Mystic Wyvern",
      "A dragon-like creature with vibrant scales and a balanced physique. It possesses both offensive and defensive capabilities, making it versatile in battle.",
      new Balanced(),
      new ElementalBreathAbilityAction(),
      30,
      1,
      16
    );
  }
}
