import { Monster } from "./monster";
import { ArcaneSheildAbilityAction } from "../action/ability/arcaneSheild";
import { MonsterIdentifier } from "/types/single/monsterState";
import { Balanced } from "../archetype/balanced";

// Random monser for now
export class MysticWvyren extends Monster {
  constructor() {
    super(
      MonsterIdentifier.MYSTIC_WYVERN,
      "Mystic Wvyren",
      "A dragon-like creature with vibrant scales and a balanced physique. It possesses both offensive and defensive capabilities, making it versatile in battle.",
      new Balanced(),
      new ArcaneSheildAbilityAction(),
      25,
      2,
      14
    );
  }
}