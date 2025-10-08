import { act } from "react";
import { ActionIdentifier } from "../../../../../types/single/actionState";
import { Action } from "../action/action";
import { Player } from "../player";
import { BattleEffect } from "./battleEffect";
import { Burn } from "./burn";
import { EndStatus } from "./endStatus";
import { LakeCurse } from "./lakeCurse";
import { Poison } from "./poison";

import { StatusType } from "/types/single/statusType";

export class AfflictionTouch extends BattleEffect {
  afflictions = [
    () => new Poison(5),
    () => new Burn(3),
    () => new LakeCurse(5),
  ];
  constructor(countdown: number = Infinity) {
    super(
      "Affliction Touch",
      "Basic attacks have a chance to inflict poison, burn or curse",
      countdown,
      StatusType.BUFF
    );
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

    if (action.getId() === ActionIdentifier.ATTACK && success) {
      const roll = Math.floor(Math.random() * 3);
      if (roll < 3) {
        affectedPlayer.addStatus(this.afflictions[roll]());
        console.log(
          `AFFLICTION TOUCH: ${actingPlayer.getName()} has inflicted ${affectedPlayer.getName()} with ${this.afflictions[
            roll
          ]().getName()}.`
        );
        actingPlayer.addLog(
          `inflicted ${affectedPlayer.getName()} with ${this.afflictions[
            roll
          ]().getName()}.`
        );
      }
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
