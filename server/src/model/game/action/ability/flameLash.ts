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
    this.damage = 5;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.damage = 5;
  }

  public prepareAnimation(): string | [string, number] {
    return "ability";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);
    affectedPlayer.addAnimation("damage");
    // Deal 10 damage if the opponent is dodging, 5 damage otherwise
    if (affectedPlayer.getArmourClassStat() >= 50) {
      //TODO FIGURE OUT A BALANCED AC
      this.damage = 10;
      affectedPlayer.addAnimation("crit");
    }

    //to remove once dodge is reworked?
    if (affectedPlayer.getDodgingPosition()) {
      this.damage = 10;
      affectedPlayer.addAnimation("crit");
    }
    affectedPlayer.incHealth(-this.damage);

    // Log the action
    actingPlayer.addLog(
      `You used ${this.getName()}, dealing ${
        this.damage
      } damage to ${affectedPlayer.getName()}.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${
        this.damage
      } damage to you.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${
        this.damage
      } damage to ${affectedPlayer.getName()}.`
    );

    this.executeBattleEffect(actingPlayer, affectedPlayer, true);

    //No status applied in this action/ability
    return {
      appliedStatus: {
        success: false,
      },
    };
  }
}
