import { Player } from "../player";
import { Status } from "./status";

export class Poison extends Status {
  constructor(countdown: number = 5) {
    super("Poison", "Lose 1 HP.", countdown);
  }

  //TODO: implement poison
  public effect(player: Player): void {

    player.incHealth(-1);
    console.log("Player poison tick");

  }
}
