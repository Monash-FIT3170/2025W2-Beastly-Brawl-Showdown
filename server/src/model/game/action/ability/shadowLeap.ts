import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class ShadowLeapAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.SHADOW_LEAP,
      "Shadow Leap",
      "Can evade an attack once per battle.",
      Infinity
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.dodge()
    affectedPlayer.getActions().forEach((action) => {
      action.incCurrentUse(-1);
      if (action.getName()!="Elemental Breath"){
        affectedPlayer. removeAction(action)
      }
    });

  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.addLog(
      `You dodge using ${this.getName()} hopefully they dont get you`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} attempts to dodge with ${this.getName()}`
    );
  }
}
