import { Archetype } from "./archetype";
import { FeralStrikeAbilityAction } from "../action/ability/feralStrike";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Attacker extends Archetype {
  constructor() {
    super("Attacker", new FeralStrikeAbilityAction(), ArchetypeIdentifier.ATTACKER, 25); // Attacker-type monsters have an enhanced crit rate of 25%
  }
}
