import { Action } from "./action";
import { Player } from "../player";

export class NullAction extends Action {
  constructor() {
    super("Null", "No action");
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
