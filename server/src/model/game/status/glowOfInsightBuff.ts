import { Status } from "./status";
import { StartStatus } from "./startStatus";
import { Player } from "../player";
import { StatusType } from "../../../../../types/single/statusType";

export class GlowOfInsightBuff extends StartStatus {
    constructor(countDown: number) {
        super(
          "Glow of Insight",
          "+5 Attack, -3 Armour.",
          countDown,
          StatusType.BUFF
        );
      }

  public startingEffect(player: Player): void {
    player.incAttackStat(5)
    player.incArmourClassStat(-3)
    console.log(`${player.getName()}'s attack stat is increased by 4, amourclass is reduced by 4`);
  }

  public updateLogs(player: Player): void {}

  public expire(player: Player): void {
    player.incAttackStat(-5)
    player.incArmourClassStat(3)
    player.addBattleLog("Glow of Insight fades, your focus and shine dim.");
  }
}
