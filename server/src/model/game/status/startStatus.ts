import { Action } from "../action/action";
import { Player } from "../player";
import { Status } from "./status";

export abstract class StartStatus extends Status {
  public abstract startingEffect(player: Player): void;
}
