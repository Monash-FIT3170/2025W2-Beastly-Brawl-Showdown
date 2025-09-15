import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { Status } from "./status";

export class LakeBlessing extends Status {
  constructor(countdown: number = 20) {
    super(
      "Lake Blessing",
      "If the blessing is active resurrect on death",
      countdown,
      StatusType.BUFF
    );
  }

  public effect(player: Player): void {
    if (
      player.getHealth() <= Math.floor(player.getMonster()?.getMaxHealth()! / 2)
    ) {
      player.setArmourClassStat(player.getArmourClassStat() + 5);
    }
  }
  public updateLogs(player: Player): void {
    player.addLog("You have been blessed, resurrection is possible!");
  }
  public expire(): void {
    console.error("Method not implemented.");
  }
}
