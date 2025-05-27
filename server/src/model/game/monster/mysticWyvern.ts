import { Monster } from "./monster";
import { ArcaneSheildAbilityAction } from "../action/ability/ArcaneSheild";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Balanced } from "../archetype/balanced";

// Random monser for now
export class MysticWvyren extends Monster {
  constructor() {
    super(
      MonsterIdentifier.SHADOWFANG_PREDATOR,
      "Mystic Wvyren",
      "A dragon-like creature with vibrant scales and a balanced physique. It possesses both offensive and defensive capabilities, making it versatile in battle.",
      new Balanced(),
      new ArcaneSheildAbilityAction(),
      30,
      1,
      16
    );
  }
}