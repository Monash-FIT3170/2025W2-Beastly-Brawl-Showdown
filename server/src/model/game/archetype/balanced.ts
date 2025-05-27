import { Archetype } from "./archetype";
import { ArcaneShieldAbilityAction } from "../action/ability/arcaneShield";

export class Balanced extends Archetype {
  constructor() {
    super("Balanced", new ArcaneShieldAbilityAction());
  }
}
