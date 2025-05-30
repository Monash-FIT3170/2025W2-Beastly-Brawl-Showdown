import { Archetype } from "./archetype";
import { FeralStrikeAbilityAction } from "../action/ability/feralStrike";

export class Warrior extends Archetype {
  constructor() {
    super("Warrior", new FeralStrikeAbilityAction(), 25); // Warrior-type monsters have an enhanced crit rate of 25%
  }
}
