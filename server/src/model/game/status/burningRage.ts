import { ActionIdentifier } from "../../../../../types/single/actionState";
import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";
import { Player } from "../player";
import { BattleEffect } from "./battleEffect";
import { Burn } from "./burn";

export class BurningRage extends BattleEffect {
  constructor(count: number) {
    super(
      "Burning Rage",
      "Every attack burns the enemy.",
      count,
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
    if (action.getId() == ActionIdentifier.ATTACK) {
      const burnCount = 2;
      affectedPlayer.addStatus(new Burn(burnCount));
      console.log(
        `BURNING RAGE: ${actingPlayer.getName()} has given ${burnCount} burn to ${affectedPlayer.getName()}`
      );
      actingPlayer.addLog(
        `Your Burning Rage has given ${affectedPlayer.getName()} a burn.`
      );
      affectedPlayer.addLog(`${actingPlayer.getName()} has burned you.`);
    }
  }

  public updateLogs(player: Player): void {}
  public expire(player: Player): void {}
}
