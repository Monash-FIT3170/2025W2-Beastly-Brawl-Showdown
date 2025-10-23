import { BattleEffect } from "./battleEffect";
import { Player } from "../player";
import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";

export class HiccupOfDoomBuff extends BattleEffect {
  constructor(countdown: number = 3) {
    super(
      "Hiccup of Doom",
      "Each time you act, an explosive hiccup deals 3 damage to a random target.",
      countdown,
      StatusType.DEBUFF
    );
  }

  public actingPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    _action: Action,
    _success: boolean
  ): void {
    // Trigger once per action
    const hitsOpponent = Math.random() < 0.5;
    if (hitsOpponent) {
      affectedPlayer.incHealth(-3);
      actingPlayer.addLog("You hiccup, it launched toward your enemy and delt 3HP!");
      affectedPlayer.addLog("A violent hiccup explodes against you for 3 damage!");
      actingPlayer.addBattleLog(`${actingPlayer.getName()}'s hiccup explodes toward ${affectedPlayer.getName()} and delt 3HP!`);
    } else {
      actingPlayer.incHealth(-3);
      actingPlayer.addLog("You hiccup, it backfires! You loss 3HP.");
      affectedPlayer.addLog(`${actingPlayer.getName()} hiccups and injures themselves.`);
      actingPlayer.addBattleLog(`${actingPlayer.getName()}'s hiccup backfires, their HP reduced by 3.`);
    }
  }

  public affectedPlayerEffect(
    _actingPlayer: Player,
    _affectedPlayer: Player,
    _action: Action,
    _success: boolean
  ): void {

  }

  public updateLogs(_player: Player): void {
  }

  public expire(player: Player): void {
    player.addBattleLog("The hiccups finally stop but the battle goes on.");
  }
}