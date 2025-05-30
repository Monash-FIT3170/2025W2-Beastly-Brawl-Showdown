import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Balanced } from "../archetype/balanced";
import { ElementalBreathAbilityAction } from "../action/ability/elementalBreath";

export class CinderTail extends Monster {
  constructor() {
    super(
      MonsterIdentifier.CINDER_TAIL,
      "Cinder Tail",
      "A dragon-like creature with vibrant scales and a balanced physique. It possesses both offensive and defensive capabilities, making it versatile in battle.",
      new Balanced(),
      new ElementalBreathAbilityAction(),
      25,
      7,
      14
    );
  }
}
