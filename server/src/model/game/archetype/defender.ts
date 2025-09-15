import { Archetype } from "./archetype";
import { FortressStanceAbilityAction } from "../action/ability/fortressStance";
import { ArchetypeIdentifier } from "/types/single/monsterState";

export class Defender extends Archetype {
  constructor() {
    super(
      "Defender",
      new FortressStanceAbilityAction(),
      ArchetypeIdentifier.DEFENDER,
      "Defenders are the toughest monsters of the pack. Each have a heavy armour class and lots of health points. You can outsurvive your opponent, withstanding many attacks!"
    );
  }
}
