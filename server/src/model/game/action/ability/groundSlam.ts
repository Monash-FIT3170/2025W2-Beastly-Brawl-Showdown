import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { Stun } from "../../status/stun";

export class GroundSlamAbilityAction extends Action {
  //TODO: update to utilise stun EFFECT!!!
  constructor() {
    super(
      ActionIdentifier.GROUND_SLAM,
      "Ground Slam",
      "Stomp the earth with brutal force. Deal 3 damage and leave your opponent stunned, unable to act next turn.",
      2
    );
    this.damage = 3;
  }

  // Clear the opponent's actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // affectedPlayer.clearActions();
  }

  public prepareAnimation(): string | [string, number] {
    return "ability";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);

    // Deal 3 damage + Stun
    affectedPlayer.incHealth(-this.damage);
    affectedPlayer.addStatus(new Stun(1));
    affectedPlayer.addAnimation("damage");

    // Add logs
    // actingPlayer.addLog(
    //   `You used ${this.getName()}, dealing 3 damage and stunning ${affectedPlayer.getName()} for 1 turn.`
    // );
    // affectedPlayer.addLog(
    //   `${actingPlayer.getName()} used ${this.getName()}, dealing 3 damage and stunning you for 1 turn.`
    // );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, dealing ${
        this.damage
      } damage and stunning ${affectedPlayer.getName()} for 1 turn.`
    );

    this.executeBattleEffect(actingPlayer, affectedPlayer, true);

    //Success evaluates true since the current status rate for this ability is 100%
    return {
      appliedStatus: {
        success: true,
      },
    };
  }
}
