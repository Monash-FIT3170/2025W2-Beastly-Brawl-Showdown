import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class GroundSlamAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.GROUND_SLAM,
      "Ground Slam",
      "Can stun opponents with a powerful stomp."
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
