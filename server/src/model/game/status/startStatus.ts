import { Action } from "../action/action";
import { Player } from "../player";
import { Status } from "./status";
import { StatusType } from "/types/single/statusType";

export abstract class StartStatus extends Status {
  public abstract startingEffect(player: Player): void;
}
