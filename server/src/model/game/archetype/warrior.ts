import { Archetype } from "./archetype";
import { FeralStrikeAbilityPassive } from "../action/ability/feralStrike";

export class Warrior extends Archetype {
  constructor() {
    super("Warrior", new FeralStrikeAbilityPassive(), 25); // Warrior-type monsters have an enhanced crit rate of 25%
  }
}
