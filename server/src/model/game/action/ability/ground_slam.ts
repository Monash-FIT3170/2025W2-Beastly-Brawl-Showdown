import { Action } from "../action";
import { Player } from "../../player";

export class GroundSlamAbilityAction extends Action {
  constructor() {
    super("Ground Slam", "Can stun opponents with a powerful stomp.");
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
