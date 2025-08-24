import { Archetype } from "./archetype";
import { TipTheScalesAbilityAction } from "../action/ability/tipTheScales";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Balanced extends Archetype {
  constructor() {
    //i've set crit rate as the default in the action
    //this is disgusting code please forgive me....
    super(
      "Balanced",
      new TipTheScalesAbilityAction(),
      ArchetypeIdentifier.BALANCED
    );
  }
}
