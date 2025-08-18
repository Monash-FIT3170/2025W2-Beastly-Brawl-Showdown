import { MonsterIdentifier, MonsterState } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Neutral } from "../archetype/neutral";
import { NullAction } from "../action/null";

export class Slime extends Monster {
  constructor(name: string, stage: number) {
    super(
      MonsterIdentifier.SLIME,
      name,
      "blob blob...",
      new Neutral(),
      new NullAction(), //TODO: give ability?
      5 * stage,
      0,
      8
    );
  }
}
