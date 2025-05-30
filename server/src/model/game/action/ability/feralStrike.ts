import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier } from "/types/single/actionState";
import { AttackAction } from "../attack";
import HostBattles from "/client/src/pages/Lobby/HostBattles";

export class FeralStrikeAbilityAction extends Action {
  
  private strike = new AttackAction(5);
  constructor() {
    super(
      ActionIdentifier.FERAL_STRIKE,
      "Feral Strike",
      "Deals extra damage on critical hits.",
      1
    );
  }
  //just increasing attack bonus of player for the turn
  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    var bonus = actingPlayer.getAttackStat();
    bonus += 3
    let strike = new AttackAction(bonus);
    strike.prepare(actingPlayer,affectedPlayer)
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);
    this.strike.execute(actingPlayer,affectedPlayer)
    actingPlayer.addLog(
      `Critcal damage increase due to ${this.getName()}`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} has used ${this.getName()} increasing their critical damage`
    );
    
  }
}
