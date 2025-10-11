import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";

export class FlameLashAbilityAction extends Action {
  // Attack that always lands on your opponent, even if they attempt to dodge the attack.
  constructor() {
    super(
      ActionIdentifier.FLAME_LASH,
      "Flame Lash",
      "Whip your blazing tail for 5 damage. If your foe tries to dodge, the flames bend and strike again for another 5 damage.",
      1
    );
    this.setDodgeable(false);
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public prepareAnimation(): string | [string, number] {
  return "FlameLash_Animation";
}


  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    let damage: number = 0;
    this.incCurrentUse(-1);

    // Deal 10 damage if the opponent is dodging, 5 damage otherwise
    if (affectedPlayer.getDodgingPosition()) {
      affectedPlayer.incHealth(-10);
      damage = 10
    } else {
      affectedPlayer.incHealth(-5);
      damage = 5
    }

    // Log the action
    actingPlayer.addLog(
      `You used ${this.getName()}, dealing ${
        affectedPlayer.getDodgingPosition() ? 10 : 5
      } damage to ${affectedPlayer.getName()}.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${
        affectedPlayer.getDodgingPosition() ? 10 : 5
      } damage to you.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${
        affectedPlayer.getDodgingPosition() ? 10 : 5
      } damage to ${affectedPlayer.getName()}.`
    );

    //No status applied in this action/ability
    return {
      appliedStatus: {
        success: false
      },
      damageDealt: {
        damage: damage
      }
    }
  }
}
