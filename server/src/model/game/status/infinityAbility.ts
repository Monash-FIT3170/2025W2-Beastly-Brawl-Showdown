import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { StartStatus } from "./startStatus";

export class InfinityAbility extends StartStatus {
  constructor(countDown: number = 5) {
    super(
      "Infinity Ability",
      "Replenish ability use every turn.",
      countDown,
      StatusType.BUFF
    );
  }

  public startingEffect(player: Player): void {
    player.getActions().forEach((a) => {
      a.incCurrentUse(a.getMaxUse() - a.getCurrentUse());
    });
  }

  public updateLogs(player: Player): void {
    player.addLog("All your abilities have been replenished!");
  }
  public expire(player: Player): void {}
}
