import { Action } from "./action";
import { Player } from "../player";

export class NullAction extends Action {
  constructor() {
    super("Null", "No action");
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
