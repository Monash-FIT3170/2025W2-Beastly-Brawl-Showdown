import { Action } from "../action";
import { Player } from "../../player";
<<<<<<< HEAD
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
=======
import { ActionIdentifier } from "/types/single/actionState";
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))
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
  }

  // Clear the opponent's actions
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    // affectedPlayer.clearActions();
  }

    public prepareAnimation(): string | [string, number] {
    return "Ground_Slam_Animation";
  }


  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);

    // Deal 3 damage + Stun
    affectedPlayer.incHealth(-3);
<<<<<<< HEAD
    affectedPlayer.addStatus(new Stun(1), 100);
=======
    affectedPlayer.addStatus(new Stun(1));
>>>>>>> 2171564 (3001+3002: new monsters & bugfixes on initial monsters (#50))

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

    //Success evaluates true since the current status rate for this ability is 100%
    return {
      appliedStatus: {
        success: true
      }
    }
  }
}
