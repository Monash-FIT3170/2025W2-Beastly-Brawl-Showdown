import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class ElementalBreathAbilityAction extends Action {
  //attack that even if dodged deals damage 
  constructor() {
    super(
      ActionIdentifier.ELEMENTAL_BREATH,
      "Elemental Breath",
      "Deals damage to opponents in a cone. Dealing 5 damage on direct hits and 2 if the enenmy is dodging",
      1
    );
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    //finds out of the target is dodging then deals extra damage if standing still, baseline damage dealt regardless of enemy position
    this.incCurrentUse(-1);
    var dodge = affectedPlayer.getDodgingPosition()
    affectedPlayer.incHealth(-2)
    if (dodge != true){
        affectedPlayer.incHealth(-3);
    }
    actingPlayer.addLog(
      `${this.getName()} used, no escaping now!!!`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()} no escaping now!!!`
    );
  }
}