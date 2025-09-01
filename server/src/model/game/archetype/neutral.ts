import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { SlimeSupportAction } from "../action/ability/slimeSupport";
import { NullAction } from "../action/null";
import { Archetype } from "./archetype";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Neutral extends Archetype {
  constructor() {
    //TODO: GIVE ABILITY???
    super("Neutral", new SlimeSupportAction(), ArchetypeIdentifier.NEUTRAL);
  }
}
