import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

/**
 * FIX
 * Poison using statuses needs to be implemented.
 */

export class PoisonAttack extends Action {
  // Attack that always lands on your opponent, even if they attempt to dodge the attack.
  constructor() {
    super(
      ActionIdentifier.POISON_ATTACK,
      "Poison Attack",
      "Poison your opponent, dealing damage over time.",
      1
    );
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // TOODO: Implement poison status effect
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    // TODO: Implement poison damage logic
  }
}
