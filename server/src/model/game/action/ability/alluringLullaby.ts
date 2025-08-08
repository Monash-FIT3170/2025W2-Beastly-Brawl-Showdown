import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

export class AlluringLullaby extends Action {
  // Attack that always lands on your opponent, even if they attempt to dodge the attack.
  constructor() {
    super(
      ActionIdentifier.ALLURING_LULLABY,
      "Alluring Lullaby",
      "Confuse your opponent, if they attack you, they will take 5 damage.",
      1
    );
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // TOODO: Implement confusion status effect
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    // if (affectedPlayer.) {
    //   // If the opponent is already confused, they take 5 damage
    //   affectedPlayer.incHealth(-5);
    //   affectedPlayer.addLog(
    //     `${affectedPlayer.getName()} is confused and takes 5 damage!`
    //   );
    // }
  }
}
