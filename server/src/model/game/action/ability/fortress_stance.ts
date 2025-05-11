import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/types";

export class FortressStanceAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.ATTACK,
      "Fortress Stance",
      "Increases AC for one round."
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
