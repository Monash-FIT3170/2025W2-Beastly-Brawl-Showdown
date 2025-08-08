import { Monster } from "./monster";
import { Tank } from "../archetype/tank";
import { MonsterIdentifier } from "/types/single/monsterState";
import { AlluringLullaby } from "./../action/ability/alluringLullaby";

export class CharmerCobra extends Monster {
  constructor() {
    super(
      MonsterIdentifier.CHARMER_COBRA,
      "Charmer Cobra",
      "A sleek, serpentine creature with mesmerizing patterns on its scales. It can charm its foes, leaving them vulnerable to its attacks.",
      new Tank(),
      new AlluringLullaby(),
      30,
      2,
      14
    );
  }
}
