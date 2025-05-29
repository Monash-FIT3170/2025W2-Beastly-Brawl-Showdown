import { Archetype } from "./archetype";
import { FeralStrikeAbilityAction } from "../action/ability/feralStrike";

export class Warrior extends Archetype {
  constructor() {
    super("Warrior", new FeralStrikeAbilityAction());
  }
}
