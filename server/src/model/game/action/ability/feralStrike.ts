import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";
import HostBattles from "/client/src/pages/Lobby/HostBattles";

export class FeralStrikeAbilityPassive extends Action {
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Increases your critical hit rate by 15%.",
      0 // Passive abilities do not have uses
    );
  }
  //just increasing attack bonus of player for the turn
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    var bonus = actingPlayer.getAttackStat();
    bonus += 3
    actingPlayer.setAttackStat(bonus)
    let strike = new AttackAction(5);
    strike.prepare(actingPlayer,affectedPlayer)
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
