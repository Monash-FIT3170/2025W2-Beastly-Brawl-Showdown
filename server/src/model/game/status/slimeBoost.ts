import { Player } from "../player";
import { Status } from "./status";

export class SlimeBoost extends Status {
  constructor(countdown: number) {
    super("Slime Support", "Double your lowest rated stat!", countdown);
  }

  public effect(player: Player): void {
    const buffedStat = "Unknown";

    console.error("Slime Support not implemented :(");
    console.log(`${player.getName()} +X ${buffedStat}`);
  }
}
