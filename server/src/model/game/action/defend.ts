import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier } from "/types/single/actionState";
import { act } from "react";

export class DefendAction extends Action {
  private armourBonus: number;

  constructor(armourBonus: number) {
    super(ActionIdentifier.DEFEND, "Defend", "Defend against an attack", 3);
    this.armourBonus = armourBonus;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.incArmourClassStat(this.armourBonus);
    actingPlayer.addLog(
      `You defended and increased your armour class stat by ${this.armourBonus}.`
    );
    // affectedPlayer.addLog(
    //   `${actingPlayer.getName()} defended and increased their armour class stat by ${
    //     this.armourBonus
    //   }.`
    // );
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);
  }
}
