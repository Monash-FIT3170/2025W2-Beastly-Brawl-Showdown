import { Player } from "../player";
import { Status } from "./status";
import { StatusType } from "/types/single/statusType";

export class Poison extends Status {
  constructor(countdown: number = 5) {
    super("Poison", "Lose 1 HP.", countdown, StatusType.DEBUFF);
  }

  public effect(player: Player): void {
    player.incHealth(-1);
    console.log(`${player.getName()} -1 Health: Poison Tick`);
  }

  public updateLogs(player: Player): void {
    player.addLog(`You have been poisoned, -1 HP.`);
  }
  public expire(): void {
    console.error("Method not implemented.");
  }
}
