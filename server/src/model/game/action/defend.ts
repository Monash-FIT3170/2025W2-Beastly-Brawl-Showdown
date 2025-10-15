import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { act } from "react";
import { Shield } from "../status/shield";

export class DefendAction extends Action {
  private armourBonus: number;

  constructor(armourBonus: number) {
    super(ActionIdentifier.DEFEND, "Defend", "Defend against an attack", 3);
    this.armourBonus = armourBonus;
  }

  public prepareAnimation(): string | [string, number] {
    return "defend";
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    if (actingPlayer.hasStatus("Shield")) {
      const existingShield = actingPlayer.getStatusByName("Shield") as Shield;
      existingShield.setCountDown(3);
      // actingPlayer.addLog("You reinforced your shield!");
    } else {
      // Create new shield
      const shield = new Shield(3, this.armourBonus);
      actingPlayer.addStatus(shield);
      // actingPlayer.addLog("You raised a defensive shield!");
    }

    // affectedPlayer.addLog(
    //   `${actingPlayer.getName()} defended and raised a shield!`
    // );
    actingPlayer.addBattleLog(
      `${actingPlayer.getName()} defended and raised a shield!`
    );
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);
    this.executeBattleEffect(actingPlayer, affectedPlayer, true);
    return {
      appliedStatus: {
        success: false,
      },
    };
  }
}
