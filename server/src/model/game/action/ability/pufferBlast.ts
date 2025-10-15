import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { Poison } from "../../status/poison";

export class PufferBlast extends Action {
  constructor() {
    super(
      ActionIdentifier.PUFFER_BLAST,
      "Puffer Blast",
      "Launch three spiky pufferfish at your foe. Each has a 50% chance to hit, dealing 2 damage per pop.",
      1
    );
  }

  // Clear the opponent's actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.damage = 0;
  }

  public prepareAnimation(): string | [string, number] {
    return "ability";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);

    var hitFishes = 0;
    var hitDamage = 0;
    var poisonStacks = 0;
    // Each fish has a 50% chance to hit
    for (let i = 0; i < 3; i++) {
      if (Math.random() < 0.5) {
        hitFishes++;
        hitDamage += 2; // Each fish deals 2 damage
        if (Math.random() < 0.5) {
          poisonStacks++;
        }
      }
    }
    // Apply damage to the affected player
    affectedPlayer.incHealth(-hitDamage);
    for (let i = 0; i < poisonStacks; i++) {
      affectedPlayer.addStatus(new Poison(5));
    }
    this.damage = hitDamage;

    // Add logs
    actingPlayer.addLog(
      `You used ${this.getName()}. ${hitFishes} fish hit inflicting ${hitDamage} and poisoning them ${poisonStacks} times.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${hitDamage} damage and poisoning you ${poisonStacks} times.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${hitDamage} damage to ${affectedPlayer.getName()} and poisoning them ${poisonStacks} times.`
    );

    if (hitDamage > 0) {
      this.executeBattleEffect(actingPlayer, affectedPlayer, true);
      affectedPlayer.addAnimation("damage");
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
