import { Action } from "../action/action";
import { Player } from "../player";
import { Status } from "./status";
import { StatusType } from "/types/single/statusType";

export abstract class StartStatus extends Status {
  constructor(
    name: string,
    description: string,
    countDown: number = 0,
    type: StatusType
  ) {
    super(name, description, countDown + 1, type);
  }
  public abstract startingEffect(player: Player): void;
}
