import { Monster } from "./monster";

import { MonsterIdentifier } from "../../../../../types/single/monsterState";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { Attacker } from "../archetype/attacker";

export class JackedOLantern extends Monster {
  constructor(name = "Jacked o' Lantern") {
    super(
      MonsterIdentifier.JACKED_O_LANTERN,
      name,
      "The raid boss of The Spook Garden Event. A large pumpkin with arms and legs to devour its prey.",
      new Attacker(),
      new GroundSlamAbilityAction(),
      40,
      4,
      10
    );
  }
}
