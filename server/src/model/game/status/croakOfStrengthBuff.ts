import { act } from "react";
import { ActionIdentifier } from "../../../../../types/single/actionState";
import { Action } from "../action/action";
import { Player } from "../player";
import { BattleEffect } from "./battleEffect";
import { Poison } from "./poison";
import { StatusType } from "../../../../../types/single/statusType";

export class CroakOfStrengthBuff extends BattleEffect {

  constructor(countdown: number = Infinity) {
    super(
      "Croak Of Strength",
      "Your attacks have a 40% chance to inflict poison for 3 turns when attacking.",
      countdown,
      StatusType.BUFF
    );
  }

  public affectedPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void {}
  
  public actingPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void {
    
    if (action.getId() === ActionIdentifier.ATTACK && success) {
      const numb = Math.floor(Math.random());
      if (numb < 0.4) {
        affectedPlayer.addStatus(new Poison(3));
        console.log(
          `${actingPlayer.getName()} has poisoned ${affectedPlayer.getName()} for 3 turns.`
        );
        actingPlayer.addLog(
          `Your strike leaves a toxic sting, ${affectedPlayer.getName()} is poisoned.`
        );
      }
    }
  }

  public updateLogs(player: Player): void {}

  public expire(player: Player): void {
    player.addBattleLog("Croaking Venom fades, your strikes lose their toxic bite.");
  }
}
