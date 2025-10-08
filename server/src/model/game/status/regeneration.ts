import { Player } from "../player";
import { EndStatus } from "./endStatus";

import { StatusType } from "/types/single/statusType";

export class Regeneration extends EndStatus {
  constructor(countdown: number = 5) {
    super("Regeneration", "Gain 1 HP.", countdown, StatusType.BUFF);
  }

  public endingEffect(player: Player): void {
    player.incHealth(1);
    console.log(`${player.getName()} -1 Health: Poison Tick`);
    // player.addLog(`You have been poisoned, -1 HP.`)
  }

  public updateLogs(player: Player): void {
    player.addLog(`You have been restored, 1 HP.`);
  }
  public expire(): void {
    console.error("Method not implemented.");
  }
}
