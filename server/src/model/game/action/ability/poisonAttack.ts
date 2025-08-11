import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
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

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);
    var numberOfTurns = 5;
    
    // Poison the opponent
    affectedPlayer.addStatus(new Poison(numberOfTurns), 100);

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

    //Success evaluates true since the curren rate of poison for this ability is 100%...
    return {
      appliedStatus: {
        success: true
        
      }
    }
  }
}
