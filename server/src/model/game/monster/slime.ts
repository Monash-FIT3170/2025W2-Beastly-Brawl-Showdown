import { MonsterIdentifier, MonsterState } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Neutral } from "../archetype/neutral";
import { NullAction } from "../action/null";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { SlimeSupportAction } from "../action/ability/slimeSupport";

export class Slime extends Monster {
  constructor(name: string) {
    super(
      MonsterIdentifier.SLIME,
      name,
      "blob blob...",
      new Neutral(),
      new SlimeSupportAction(),
      5,
      1,
      8
    );
  }
}
