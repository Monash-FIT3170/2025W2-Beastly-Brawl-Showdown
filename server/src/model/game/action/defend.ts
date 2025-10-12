import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { act } from "react";

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
    actingPlayer.incArmourClassStat(this.armourBonus);
    actingPlayer.addLog(
      `You defended and increased your armour class stat to ${actingPlayer.getArmourClassStat()}.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} defended and increased their armour class stat to ${actingPlayer.getArmourClassStat()}.`
    );
    actingPlayer.addBattleLog(
      `${actingPlayer.getName()} defended and increased their armour class stat to ${actingPlayer.getArmourClassStat()}.`
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
