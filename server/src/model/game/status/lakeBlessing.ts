import { Player } from "../player";
import { Status } from "./status";
import { StatusType } from "/types/single/statusType";

export class LakeBlessing extends Status {
  constructor(countdown: number = 20) {
    super(
      "Lake Blessing",
      "If the blessing is active resurrect on death",
      countdown,
      StatusType.DEBUFF
    );
  }

  public effect(player: Player): void {
    if (
      player.getHealth() <= Math.floor(player.getMonster()?.getMaxHealth()! / 2)
    ) {
      player.setArmourClassStat(player.getArmourClassStat() + 5);
    }
  }
}
