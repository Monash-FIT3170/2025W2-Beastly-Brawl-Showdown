import { Monster } from "./monster";
import { Tank } from "../archetype/tank";
import { ShieldAbilityAction } from "../action/ability/shield";
import { AttackAction } from "../action/attack";
import { DefendAction } from "../action/defend";

// Random monser for now
export class Dragon extends Monster {
  constructor() {
    super(
      "Dragon",
      "A fierce dragon",
      new Tank(),
      new ShieldAbilityAction(),
      100,
      new AttackAction(20),
      new DefendAction(5)
    );
  }
}
