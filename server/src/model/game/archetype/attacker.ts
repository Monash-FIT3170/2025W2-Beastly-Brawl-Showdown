import { Archetype } from "./archetype";
import { FeralStrikeAbilityAction } from "../action/ability/feralStrike";

export class Attacker extends Archetype {
  constructor() {
    super("Attacker", new FeralStrikeAbilityAction(), 25); // Attacker-type monsters have an enhanced crit rate of 25%
  }
}
