import { Action } from "../action";
import { Player } from "../../player";
<<<<<<< HEAD
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
=======
import { ActionIdentifier } from "/types/single/actionState";
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))

export class TripleFishLaunch extends Action {
  constructor() {
    super(
      ActionIdentifier.TRIPLE_FISH_LAUNCH,
      "Triple Fish Launch",
      "Launch three fish at your opponent, each having a chance to deal 2 damage.",
      1
    );
    this.setDodgeable(false);
  }

  // Clear the opponent's actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

<<<<<<< HEAD
  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
=======
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
    this.incCurrentUse(-1);

    var hitFishes = 0;
    var hitDamage = 0;
    // Each fish has a 50% chance to hit
    for (let i = 0; i < 3; i++) {
      if (Math.random() < 0.5) {
        hitFishes++;
        hitDamage += 2; // Each fish deals 2 damage
      }
    }
    // Apply damage to the affected player
    affectedPlayer.incHealth(-hitDamage);

    // Add logs
    actingPlayer.addLog(
      `You used ${this.getName()}. ${hitFishes} fish hit inflicting ${hitDamage}.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${hitDamage} damage.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${hitDamage} damage to ${affectedPlayer.getName()}.`
    );
<<<<<<< HEAD

    return {
      appliedStatus:{
        success: false
      }
    }
=======
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
  }
}
