import { Archetype } from "./archetype";
import { FeralStrikeAbilityAction } from "../action/ability/FeralStrike";

export class Dps extends Archetype {
  constructor() {
    super("Dps", new FeralStrikeAbilityAction());
  }
}
