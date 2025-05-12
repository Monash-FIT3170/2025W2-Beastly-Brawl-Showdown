import { Monster } from "./monster";
import { MonsterIdentifier } from "/types/single/monsterState";
import { VenomousStrikeAbilityAction } from "../action/ability/venomousStrike";
import { Rouge } from "../archetype/rouge";

// Random monser for now
export class ViciousViper extends Monster {
  constructor() {
    super(
      MonsterIdentifier.VICIOUS_VIPER,
      "Vicious Viper",
      "A large, elegant viper flaunting its pointy fangs, known to have the deadliest poison in the world.",
      new Rouge(),
      new VenomousStrikeAbilityAction(),
      30,
      1,
      16
    );
  }
}
