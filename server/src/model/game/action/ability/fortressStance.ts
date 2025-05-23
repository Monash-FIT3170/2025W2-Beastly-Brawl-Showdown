import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class FortressStanceAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.FORTRESS_STANCE,
      "Fortress Stance",
      "Increases AC for one round.",
      Infinity
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.addLog(
      `You did nothing. Unimplemented action ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} did nothing. Unimplemented action ${this.getName()}`
    );
  }
}
