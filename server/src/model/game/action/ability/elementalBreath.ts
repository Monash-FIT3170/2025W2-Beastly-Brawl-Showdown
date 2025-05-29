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
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    var dodge = affectedPlayer.getDodgingPosition()
    affectedPlayer.incHealth(-2)
    if (dodge != true){
        affectedPlayer.incHealth(-3);
    }
    actingPlayer.addLog(
      `${this.getName()} used, no escaping now!!!`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()} no escaping now!!!`
    );
  }
}