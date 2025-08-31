import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { NullAction } from "../action/null";
import { Archetype } from "./archetype";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Neutral extends Archetype {
  constructor() {
    //TODO: GIVE ABILITY???
    super("Neutral", new NullAction(), ArchetypeIdentifier.NEUTRAL);
  }
}
