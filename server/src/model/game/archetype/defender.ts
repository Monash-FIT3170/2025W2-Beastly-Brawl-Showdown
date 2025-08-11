import { Archetype } from "./archetype";
import { FortressStanceAbilityAction } from "../action/ability/fortressStance";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Defender extends Archetype {
  constructor() {
    super("Defender", new FortressStanceAbilityAction(),ArchetypeIdentifier.DEFENDER);
  }
}
