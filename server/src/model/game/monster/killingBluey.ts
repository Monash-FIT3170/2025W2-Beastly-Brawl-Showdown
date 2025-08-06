import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Balanced } from "../archetype/balanced";
import { NetTrap } from "./../action/ability/netTrap";

export class KillingBluey extends Monster {
  constructor() {
    super(
      MonsterIdentifier.KILLING_BLUEY,
      "Killing Bluey",
      "Just a little penguin with a penchant for destruction. It traps its enemies in a freezing grip, making them vulnerable to its icy onslaught.",
      new Balanced(),
      new NetTrap(),
      23,
      3,
      12
    );
  }
}
