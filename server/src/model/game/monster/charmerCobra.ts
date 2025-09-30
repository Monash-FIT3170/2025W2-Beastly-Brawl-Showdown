import { Monster } from "./monster";

import { MonsterIdentifier } from "/types/single/monsterState";
import { AlluringLullaby } from "./../action/ability/alluringLullaby";
import { Defender } from "../archetype/defender";

export class CharmerCobra extends Monster {
  constructor(name: string = "Charmer Cobra") {
    super(
      MonsterIdentifier.CHARMER_COBRA,
      name,
      "A serpent with a hypnotic sway and haunting lullaby. Those who hear its song soon find themselves striking their own instead.",
      new Defender(),
      new AlluringLullaby(),
      30,
      2,
      14
    );
  }
}
