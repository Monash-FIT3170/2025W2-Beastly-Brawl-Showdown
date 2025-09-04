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
      `You defended and increased your armour class stat by ${this.armourBonus}.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} defended and increased their armour class stat by ${
        this.armourBonus
      }.`
    );
    actingPlayer.addBattleLog(
      `${actingPlayer.getName()} defended and increased your armour class stat by ${
        this.armourBonus
      }.`
    );
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);
    return {
      appliedStatus: {
        success: false
      }
    }
  }
}
