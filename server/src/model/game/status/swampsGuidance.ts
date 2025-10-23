import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { StartStatus } from "./startStatus";

export class SwampsGuidance extends StartStatus {
  constructor(countDown: number) {
    super(
      "Swamps Guidance",
      "The fog moves when you do, like it's shielding you (+3 AC).",
      countDown,
      StatusType.BUFF
    );
  }

  public startingEffect(player: Player): void {
    player.incArmourClassStat(3)
  }

  public updateLogs(player: Player): void {}

  public expire(player: Player): void {
    player.incArmourClassStat(-3)
    console.log(`The fog thins, Swamp's Guidance fades.`);
  }
}
