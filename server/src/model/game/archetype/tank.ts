import { Archetype } from "./archetype";
import { FortressStanceAbilityAction } from "../action/ability/fortressStance";

export class Tank extends Archetype {
  constructor() {
    super("Tank", new FortressStanceAbilityAction());
  }
}
