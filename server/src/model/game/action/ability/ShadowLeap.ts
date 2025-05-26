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
        affectedPlayer.getActions().filter(item => item !== action)
      }
    });

  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.addLog(
      `You did nothing. Unimplemented action ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} did nothing. Unimplemented action ${this.getName()}`
    );
  }
}