import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class ArcaneSheildAbilityAction extends Action {
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Arcane Sheild",
      "Can reroll one d20 roll once per battle",
      1
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    //replay dice roll
    actingPlayer.addLog(
      `You did nothing. Unimplemented action ${this.getName()}`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} did nothing. Unimplemented action ${this.getName()}`
    );
  }
}