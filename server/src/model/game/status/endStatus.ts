import { Action } from "../action/action";
import { Player } from "../player";
import { Status } from "./status";

export abstract class EndStatus extends Status {
  public abstract endingEffect(player: Player): void;
}
