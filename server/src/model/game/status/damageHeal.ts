import { act } from "react";
import { ActionIdentifier } from "../../../../../types/single/actionState";
import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";
import { Player } from "../player";
import { BattleEffect } from "./battleEffect";

export class DamageHeal extends BattleEffect {
  constructor(countdown: number = 5) {
    super("Damage Heal", "Please rename this", countdown, StatusType.BUFF);
  }

  public affectedPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void {
    //nothing happens
  }
  public actingPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void {
    //by default, non damaging actions will have damage = 0
    if (success && action.getDamage() > 0) {
      console.log(
        `DMG HEAL: ${actingPlayer.getName()} has healed for ${action.getDamage()}`
      );
      actingPlayer.addLog(
        `You healed for ${action.getDamage()} thanks to Damage Heal`
      );
      affectedPlayer.addLog(
        `${actingPlayer.getName()} healed for ${action.getDamage()} thanks to Damage Heal`
      );
      actingPlayer.incHealth(action.getDamage());
    }
  }

  public effect(player: Player): void {
    console.error("DamageHeal: Method not implemented.");
  }
  public updateLogs(player: Player): void {}
  public expire(): void {
    console.error("DamageHeal: Method not implemented.");
  }
}
