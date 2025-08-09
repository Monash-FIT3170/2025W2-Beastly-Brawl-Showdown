import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { Stun } from "../../status/stun";

export class GroundSlamAbilityAction extends Action {
  //TODO: update to utilise stun EFFECT!!!
  constructor() {
    super(
      ActionIdentifier.GROUND_SLAM,
      "Ground Slam",
      "Deal 3 damage and stun your opponent, preventing them from acting for 1 turn.",
      1
    );
  }

  // Clear the opponent's actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // affectedPlayer.clearActions();
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);

    // Deal 3 damage + Stun
    affectedPlayer.incHealth(-3);
    affectedPlayer.addStatus(new Stun(1));

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
