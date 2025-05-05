import { Action } from "../action";
import { Player } from "../../player";

export class FortressStanceAbilityAction extends Action {
  constructor() {
    super("Fortress Stance", "Increases AC for one round.");
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
