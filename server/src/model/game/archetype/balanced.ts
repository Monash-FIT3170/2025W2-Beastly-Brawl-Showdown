import { Archetype } from "./archetype";
import { ElementalBreathAction } from "../action/ability/Elementalbreath";

export class Balanced  extends Archetype {
  constructor() {
    super("Dps", new ElementalBreathAction());
  }
}
