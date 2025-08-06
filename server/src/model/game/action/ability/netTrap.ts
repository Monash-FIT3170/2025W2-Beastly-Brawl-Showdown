import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";

/**
 * FIX
 * This is currently doing the same thing as GroundSlamAbilityAction, but without damaging the opponent.
 * Also, stunning by clearing opponent actions needs to be changed when statuses are implemented.
 */

export class NetTrap extends Action {
  // Attack that always lands on your opponent, even if they attempt to dodge the attack.
  constructor() {
    super(
      ActionIdentifier.NET_TRAP,
      "Net Trap",
      "Trap your opponent in a net, making them unable to attack for one turn.",
      1
    );
    this.setDodgeable(false);
  }

  // Clear the opponent's actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    affectedPlayer.clearActions();
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);

    // Deal 3 damage
    affectedPlayer.incHealth(-3);

    // Add logs
    actingPlayer.addLog(
      `You used ${this.getName()}, dealing 3 damage and stunning ${affectedPlayer.getName()} for 1 turn.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing 3 damage and stunning you for 1 turn.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing 3 damage and stunning ${affectedPlayer.getName()} for 1 turn.`
    );
  }
}
