import { MonsterIdentifier, MonsterState } from "/types/single/monsterState";
import { Monster } from "./monster";
import { Neutral } from "../archetype/neutral";
import { NullAction } from "../action/null";

export class Slime extends Monster {
  private level: MonsterIdentifier;

  constructor(name: string, stage: number, level: MonsterIdentifier) {
    super(
      MonsterIdentifier.SLIME,
      name,
      "HOW DO I DESCRIBE THE SLIME?", //TODO: update
      new Neutral(),
      new NullAction(), //TODO: give ability?
      5 * stage,
      0,
      8
    );
    this.level = level;
  }

  //TODO: ensure slime is unplayable - will need to check how playable monster list is found

  //we need to consider how the level gets passed to front end to determine the images
  //because different monster level = different slime picture
  //i've put in a level - but monster state is restricted so i'm not sure
}
