import { Archetype } from "./archetype";
import { FeralStrikeAbilityAction } from "../action/ability/feralStrike";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Attacker extends Archetype {
  constructor() {
    super(
      "Attacker",
      new FeralStrikeAbilityAction(),
      ArchetypeIdentifier.ATTACKER,
      "Attackers are built for the offense! With boosted attack bonuses, this archetype can easily hit even the toughest opponents. But be wary, it comes at a cost.",
      25
    ); // Attacker-type monsters have an enhanced crit rate of 25%
  }
}
