import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier } from "/types/single/actionState";

export class NullAction extends Action {
  constructor() {
    super(ActionIdentifier.NULL, "Null", "No action");
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
