import { MonsterIdentifier } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Balanced } from "../archetype/balanced";
import { FlameLashAbilityAction } from "../action/ability/flameLash";

export class CinderTail extends Monster {
  constructor(name = "Cinder Tail") {
    super(
      MonsterIdentifier.CINDER_TAIL,
      name,
      "A blazing dragon whose tail burns brighter than the sun. Its fiery lash sears through even the quickest dodges, leaving no escape from the flames.",
      new Balanced(),
      new FlameLashAbilityAction(),
      25,
      2,
      14
    );
  }
}
