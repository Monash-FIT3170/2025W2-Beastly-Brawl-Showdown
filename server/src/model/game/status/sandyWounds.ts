import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { StartStatus } from "./startStatus";

export class SandyWounds extends StartStatus {
  constructor(countDown: number) {
    super(
      "Sandy Wounds",
      "The harsh sand has weakend you. Reduced AC.",
      countDown,
      StatusType.DEBUFF
    );
  }

  public startingEffect(player: Player): void {
    player.incArmourClassStat(-5);
  }
  public updateLogs(player: Player): void {}
  public expire(player: Player): void {}
}
