import { Monster } from "./monster";

import { MonsterIdentifier } from "/types/single/monsterState";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { Attacker } from "../archetype/attacker";

export class JackedOLantern extends Monster {
  constructor(name = "Jacked o' Lantern") {
    super(
      MonsterIdentifier.JACKED_O_LANTERN,
      name,
      "A serpent with a hypnotic sway and haunting lullaby. Those who hear its song soon find themselves striking their own instead.",
      new Attacker(),
      new GroundSlamAbilityAction(),
      50,
      4,
      10
    );
  }
}
