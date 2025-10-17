import { Action } from "../action/action";
import { Player } from "../player";
import { Status } from "./status";

export abstract class StartStatus extends Status {
  //in constructor: ensure the countdown inputted into the super is +1 to input of status. (check stun.ts)
  public abstract startingEffect(player: Player): void;
}
