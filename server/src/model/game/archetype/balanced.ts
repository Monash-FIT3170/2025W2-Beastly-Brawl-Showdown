import { Archetype } from "./archetype";
import { ElementalBreathAction } from "../action/ability/elementalBreath";

export class Balanced  extends Archetype {
  constructor() {
    super("Balanced", new ElementalBreathAction());
  }
}
