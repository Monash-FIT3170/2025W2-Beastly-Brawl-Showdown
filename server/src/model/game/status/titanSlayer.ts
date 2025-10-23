import { ActionIdentifier } from "../../../../../types/single/actionState";
import { Action } from "../action/action";
import { Player } from "../player";
import { BattleEffect } from "./battleEffect";
import { EndStatus } from "./endStatus";

import { StatusType } from "/types/single/statusType";

export class TitanSlayer extends BattleEffect {
  constructor(countdown: number = Infinity) {
    super(
      "Titan_Slayer",
      "Attacks deal damage damage to opponents with more health.",
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

    if (
      action.getId() === ActionIdentifier.ATTACK &&
      success &&
      actingPlayer.getHealth() <
        affectedPlayer.getHealth() +
          actingPlayer.getMonster()?.getAttackAction()?.getDamage()!
    ) {
      affectedPlayer.incHealth(
        -actingPlayer.getMonster()?.getAttackAction()?.getDamage()!
      );
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
