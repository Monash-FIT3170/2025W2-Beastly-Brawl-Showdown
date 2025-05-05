import { Archetype } from "./archetype";
import { ShieldAbilityAction } from "../action/ability/shield";

export class Tank extends Archetype {
  constructor() {
    super("Tank", new ShieldAbilityAction());
  }
}
