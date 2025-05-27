import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class ElementalBreathAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.ELEMENTAL_BREATH,
      "Elemental Breath",
      "Deals damage to opponents in a cone.",
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
