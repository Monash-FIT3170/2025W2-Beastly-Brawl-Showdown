import { Archetype } from "./archetype";
import { FeralStrikePassive } from "../action/ability/feralStrike";

export class Warrior extends Archetype {
  constructor() {
    super("Warrior", new FeralStrikePassive(), 25); // Warrior-type monsters have an enhanced crit rate of 25%
  }
}
