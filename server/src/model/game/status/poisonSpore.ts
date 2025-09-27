import { act } from "react";
import { ActionIdentifier } from "../../../../../types/single/actionState";
import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";
import { Player } from "../player";
import { BattleEffect } from "./battleEffect";
import { Poison } from "./poison";

export class PoisonSpore extends BattleEffect {
  constructor(countdown: number = 2) {
    super(
      "Poison Spore",
      "Both players are poisoned on an attack",
      countdown,
      StatusType.DEBUFF
    );
  }

  public affectedPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void {
    if (action.getId() == ActionIdentifier.ATTACK) {
      console.log(`POISON SPORE: Inflicted 3 poison on both players.`);
      affectedPlayer.addStatus(new Poison(3));
      actingPlayer.addStatus(new Poison(3));
      actingPlayer.addLog(
        `${affectedPlayer.getName()}'s poison spore exploded from your attack, giving you 3 poison.`
      );
      affectedPlayer.addLog(
        `The poison spore exploded from ${actingPlayer.getName()}'s attack, giving you 3 poison.`
      );
    }
  }

  public actingPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void {
    if (action.getId() == ActionIdentifier.ATTACK) {
      console.log(`POISON SPORE: Inflicted 3 poison on both players.`);
      actingPlayer.addLog(
        `The poison spore exploded from your attack, giving you 3 poison.`
      );
      affectedPlayer.addLog(
        `${actingPlayer.getName()}'s poison spore exploded from their attack, giving you 3 poison.`
      );

      affectedPlayer.addStatus(new Poison(3));
      actingPlayer.addStatus(new Poison(3));
    }
  }
  public updateLogs(player: Player): void {}
  public expire(player: Player): void {}
}
