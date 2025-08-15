import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class AlluringLullaby extends Action {
  constructor() {
    super(
      ActionIdentifier.ALLURING_LULLABY,
      "Alluring Lullaby",
      "Confuse your opponent, if they attack you, they will take 5 damage.",
      1
    );
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);

    affectedPlayer.getActions().forEach((action) => {
      // If the action is an attack, apply confusion
      if (action.getActionState().id === ActionIdentifier.ATTACK) {
        affectedPlayer.incHealth(-5);

        // Add logs
        actingPlayer.addLog(
          `You successfully used ${this.getName()}. They hit themselves in confusion.`
        );
        affectedPlayer.addLog(
          `${actingPlayer.getName()} used ${this.getName()}, you hit yourself in confusion.`
        );
        affectedPlayer.addBattleLog(
          `${actingPlayer.getName()} used ${this.getName()}, confusing ${affectedPlayer.getName()} and hitting themselves.`
        );
      } else {
        // Add logs
        actingPlayer.addLog(`Your ${this.getName()} was ineffective!`);
        affectedPlayer.addLog(
          `${actingPlayer.getName()} used ${this.getName()}, it was ineffective.`
        );
        affectedPlayer.addBattleLog(
          `${actingPlayer.getName()} used ${this.getName()}, it was ineffective.`
        );
      }
    });
  }
}
