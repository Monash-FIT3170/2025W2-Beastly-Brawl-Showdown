import { Action } from "../action";
import { iAbility } from "./iAbility";
import { Player } from "../../player";

export class ShieldAbilityAction extends Action implements iAbility {
  constructor() {
    super("Shield", "Shield against an attack");
  }

  execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
