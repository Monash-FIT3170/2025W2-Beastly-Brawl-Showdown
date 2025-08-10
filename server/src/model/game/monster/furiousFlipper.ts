import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Balanced } from "../archetype/balanced";
import { TripleFishLaunch } from "../action/ability/tripleFishLaunch";

export class FuriousFlipper extends Monster {
  constructor() {
    super(
      MonsterIdentifier.FURIOUS_FLIPPER,
      "Furious Flipper",
      "Just a little penguin with a penchant for destruction. It traps its enemies in a freezing grip, making them vulnerable to its icy onslaught.",
      new Balanced(),
      new TripleFishLaunch(),
      23,
      3,
      12
    );
  }
}
