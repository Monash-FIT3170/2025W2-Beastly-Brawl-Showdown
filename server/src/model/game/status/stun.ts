import { Player } from "../player";
import { Status } from "./status";

export class Stun extends Status {
  constructor(countDown: number) {
    super("Stun", "Monster is unable to attack", countDown);
  }

  //TODO: implement stun
  public effect(player: Player): void {
    //IDEALLY:
    //grey out moves / make buttons unclickable, forcing them to do nothing

    console.log(`${player.getName()} is stunned. Cannot make a move.`);
  }
}
