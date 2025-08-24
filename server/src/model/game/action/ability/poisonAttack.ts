import { Action } from "../action";
import { Player } from "../../player";
<<<<<<< HEAD
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
=======
import { ActionIdentifier } from "/types/single/actionState";
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
import { Poison } from "../../status/poison";

export class PoisonAttack extends Action {
  // Attack that always lands on your opponent, even if they attempt to dodge the attack.
  constructor() {
    super(
      ActionIdentifier.POISON_ATTACK,
      "Poison Attack",
      "Poison your opponent, dealing damage over time.",
      2
    );
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // TOODO: Implement poison status effect
  }

<<<<<<< HEAD
  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
=======
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
    this.incCurrentUse(-1);
    var numberOfTurns = 5;
    
    // Poison the opponent
<<<<<<< HEAD
    affectedPlayer.addStatus(new Poison(numberOfTurns), 100);
=======
    affectedPlayer.addStatus(new Poison(numberOfTurns));
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))

    // Add logs
    actingPlayer.addLog(
      `You used ${this.getName()}, ${affectedPlayer.getName()} is now poisoned for ${numberOfTurns} turns.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, you are now poisoned for ${numberOfTurns} turns.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, ${affectedPlayer.getName()} is now poisoned for ${numberOfTurns} turns.`
    );
<<<<<<< HEAD

    //Success evaluates true since the curren rate of poison for this ability is 100%...
    return {
      appliedStatus: {
        success: true
        
      }
    }
=======
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
  }
}
