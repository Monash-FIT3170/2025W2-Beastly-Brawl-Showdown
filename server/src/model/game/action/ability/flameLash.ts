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
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.damage = actingPlayer.getMonster()?.getAttackAction().getDamage()!;
  }

  public prepareAnimation(): string | [string, number] {
    return "ability";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);
    affectedPlayer.addAnimation("damage");
    const shield = affectedPlayer.getStatusByName("Shield");
    if (shield) {
      affectedPlayer.removeStatus(shield);
      affectedPlayer.addAnimation("shield-broken");
    }
    affectedPlayer.incHealth(-this.damage);

    // Log the action
    actingPlayer.addLog(
      `You used ${this.getName()}, dealing ${
        this.damage
      } damage to ${affectedPlayer.getName()}. ${
        shield ? `` : ` Your attack broke the opponent's shield.`
      }`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${
        this.damage
      } damage to you.${
        shield ? `` : ` Your shield was broken by the opponent's attack`
      }`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${
        this.damage
      } damage to ${affectedPlayer.getName()}.${
        shield
          ? ``
          : `${actingPlayer.getName()}'s attack broke ${affectedPlayer.getName()}'s shield.`
      }`
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
