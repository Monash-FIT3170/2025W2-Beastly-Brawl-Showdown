import { act } from "react";
import { ActionIdentifier } from "../../../../../../types/single/actionState";
import { Player } from "../../player";
import { Action } from "../action";
import { SlimeBoost } from "../../status/slimeBoost";

export class SlimeSupportAction extends Action {
  //TODO: fix up!
  constructor() {
    super(
      ActionIdentifier.SLIME_SUPPORT,
      "Slime Support",
      "Use your natural ooze to boost your lowest stats for three turns.",
      1
    );
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.addStatus(new SlimeBoost(3));
  }
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    this.incCurrentUse(-1);
    // Add logs
    actingPlayer.addLog(
      `You used ${this.getName()}, giving yourself the Slime Boost buff.`
    );
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.getName()}, giving themself the Slime Boost buff.`
    );
    affectedPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.getName()}, giving yourself the Slime Boost buff.`
    );
    this.executeBattleEffect(actingPlayer, affectedPlayer, true);
  }
  public prepareAnimation(): string | [string, number] {
    return "slime-support";
  }
}
