import { count } from "console";
import { StartStatus } from "./startStatus";
import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";

export class Weak extends StartStatus {
  constructor(countDown: number) {
    super(
      "Weak",
      "Your legs don't work like they used to before, and you can't sweep the enemies to defeat.",
      countDown,
      StatusType.DEBUFF
    );
  }

  public startingEffect(player: Player): void {
    player.incArmourClassStat(-5);
    player.incHealth(-1);
    player.incAttackStat(-2);
  }

  public updateLogs(player: Player): void {
    player.addLog("In a weakened state, you lose 1 HP.");
  }

  public expire(player: Player): void {
    //nothing
  }
}
