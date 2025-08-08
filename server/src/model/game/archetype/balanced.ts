import { Archetype } from "./archetype";
import { TipTheScalesAbilityAction } from "../action/ability/tipTheScales";

export class Balanced extends Archetype {
  constructor() {
    super("Balanced", new TipTheScalesAbilityAction());
  }
}
