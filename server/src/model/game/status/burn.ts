import { Player } from "../player";
import { EndStatus } from "./endStatus";

import { StatusType } from "/types/single/statusType";

export class Burn extends EndStatus {
  constructor(countdown: number = 5) {
    super(
      "Burn",
      "Take damage equal to status counter.",
      countdown,
      StatusType.DEBUFF
    );
  }

  public endingEffect(player: Player): void {
    player.incHealth(-this.countDown);
    console.log(`${player.getName()} -${this.countDown} Health: Burn Tick`);
  }

  public updateLogs(player: Player): void {
    player.addLog(`The effects of the burn hurt you, -${this.countDown} HP.`);
  }
  public expire(): void {
    console.error("Method not implemented.");
  }
}
