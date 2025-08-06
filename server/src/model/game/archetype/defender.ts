import { Archetype } from "./archetype";
import { FortressStanceAbilityAction } from "../action/ability/fortressStance";

export class Defender extends Archetype {
  constructor() {
    super("Defender", new FortressStanceAbilityAction());
  }
}
