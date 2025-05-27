import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class ElementalBreathAction extends Action {
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
    var dodge = affectedPlayer.getDodgingPosition()
    if (dodge = true){
        affectedPlayer.incHealth(-3);
    }
    else{
        affectedPlayer.incHealth(-5);
    }
    actingPlayer.addLog(
      `${this.getName()} used, no escaping now!!!`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()} no escaping now!!!`
    );
  }
}