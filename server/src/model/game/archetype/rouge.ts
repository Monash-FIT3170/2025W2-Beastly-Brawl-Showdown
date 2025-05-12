import { Archetype } from "./archetype";
import { FortressStanceAbilityAction } from "../action/ability/fortressStance";

export class Rouge extends Archetype {
  constructor() {
    super("Rouge", new FortressStanceAbilityAction());
  }
}
