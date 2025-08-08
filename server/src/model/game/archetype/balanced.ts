import { Archetype } from "./archetype";
import { TipTheScalesAbilityAction } from "../action/ability/tipTheScales";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Balanced extends Archetype {
  constructor() {
    super("Balanced", new TipTheScalesAbilityAction(), ArchetypeIdentifier.BALANCED);
  }
}
