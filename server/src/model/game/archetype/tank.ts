import { Archetype } from "./archetype";
import { FortressStanceAbilityAction } from "../action/ability/fortress_stance";

export class Tank extends Archetype {
  constructor() {
    super("Tank", new FortressStanceAbilityAction());
  }
}
