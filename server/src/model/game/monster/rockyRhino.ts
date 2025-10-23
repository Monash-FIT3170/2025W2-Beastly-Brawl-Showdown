import { Monster } from "./monster";
import { Defender } from "../archetype/defender";
import { GroundSlamAbilityAction } from "../action/ability/groundSlam";
import { MonsterIdentifier } from "/types/single/monsterState";

export class RockyRhino extends Monster {
  constructor(name: string = "Rocky Rhino") {
    super(
      MonsterIdentifier.ROCKY_RHINO,
      name,
      "A beast that lives to rumble and crush. With one mighty stomp, it shakes the ground, stunning foes before crushing them beneath its weight.",
      new Defender(),
      new GroundSlamAbilityAction(),
      30,
      1,
      12
    );
  }
}
