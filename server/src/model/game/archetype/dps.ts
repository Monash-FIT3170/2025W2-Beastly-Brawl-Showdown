import { Archetype } from "./archetype";
import { FeralStrikeAbilityAction } from "../action/ability/feralStrike";

export class Dps extends Archetype {
  constructor() {
    super("Dps", new FeralStrikeAbilityAction());
  }
}
