import { ActionIdentifier } from "../../../../../types/single/actionState";
import { Action } from "../action/action";
import { Player } from "../player";
import { BattleEffect } from "./battleEffect";
import { EndStatus } from "./endStatus";

import { StatusType } from "/types/single/statusType";

export class BattleRage extends BattleEffect {
  increment: number = 0;
  constructor(countdown: number = Infinity) {
    super(
      "Battle Rage",
      "Consecutive Attacks Increase Damage",
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

    if (action.getId() === ActionIdentifier.ATTACK) {
      actingPlayer.getMonster()?.getAttackAction().incrementDamageDealt(1);
      this.increment += 1;
      console.log(
        `BATTLE RAGE: ${actingPlayer.getName()} has increased their damage output by 1 thanks to battle rage.`
      );
      actingPlayer.addLog(
        `Successive attack actions increased your damage dealt.`
      );
      affectedPlayer.addLog(
        `Successive attack actions increased ${actingPlayer.getName()} by 1.`
      );
    } else {
      actingPlayer
        .getMonster()
        ?.getAttackAction()
        .incrementDamageDealt(this.increment);
      this.increment = 0;
      console.log(
        `BATTLE RAGE: ${actingPlayer.getName()} has reset their damage dealt`
      );
      actingPlayer.addLog(`Damage dealt has been reset`);
      //affectedPlayer.addLog(`Damage dealt has been reset.`);
    }
  }

  public effect(player: Player): void {
    console.error("DamageHeal: Method not implemented.");
  }
  public updateLogs(player: Player): void {}

  public expire(): void {
    console.error("DamageHeal: Method not implemented.");
  }

  public endOfBattle(player: Player): void {
    player
      .getMonster()
      ?.getAttackAction()
      .incrementDamageDealt(-this.increment);
    this.increment = 0;
  }
}
