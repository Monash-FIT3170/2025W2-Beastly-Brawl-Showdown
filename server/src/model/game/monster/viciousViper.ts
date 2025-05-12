import { Monster } from "./monster";
import { Tank } from "../archetype/tank";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { MonsterIdentifier } from "/types/single/monsterState";
import { VenomousStrikeAbilityAction } from "../action/ability/venomousStrike";

// Random monser for now
export class ViciousViper extends Monster {
  constructor() {
    super(
      MonsterIdentifier.VICIOUS_VIPER,
      "Vicious Viper",
      "A large, elegant viper flaunting its pointy fangs, known to have the deadliest poison in the world.",
      new Tank(),
      new VenomousStrikeAbilityAction(),
      30,
      1,
      16
    );
  }
}
