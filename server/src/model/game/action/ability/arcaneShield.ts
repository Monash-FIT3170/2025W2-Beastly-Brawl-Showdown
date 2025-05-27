import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class ArcaneShieldAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.ARCANE_SHIELD,
      "Arcane Shield",
      "Can reroll the d20 once per battle.",
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
