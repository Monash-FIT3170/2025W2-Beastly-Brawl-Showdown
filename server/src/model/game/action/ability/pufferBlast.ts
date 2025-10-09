import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";

export class PufferBlast extends Action {
  constructor() {
    super(
      ActionIdentifier.PUFFER_BLAST,
      "Puffer Blast",
      "Launch three spiky pufferfish at your foe. Each has a 50% chance to hit, dealing 2 damage per pop.",
      1
    );
    this.setDodgeable(false);
  }

  // Clear the opponent's actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.damage = 0;
  }

  public prepareAnimation(): string | [string, number] {
    return "Puffer_Blast_Animation";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
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
    this.damage = hitDamage;

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

    if (hitDamage > 0) {
      this.executeBattleEffect(actingPlayer, affectedPlayer, true);
    } else {
      this.executeBattleEffect(actingPlayer, affectedPlayer, false);
    }

    return {
      appliedStatus: {
        success: false,
      },
    };
  }
}
