import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";
import { NullAction } from "../action/null";
import { Player } from "../player";
import { StartStatus } from "./startStatus";
import { ActionIdentifier } from "/types/single/actionState";

export class Confused extends StartStatus {
  constructor(countDown: number) {
    super(
      "Confused",
      "Attacks have a 70% chance to hit yourself.",
      countDown,
      StatusType.DEBUFF
    );
  }

  public startingEffect(player: Player): void {
    // not implemented yet
  }

  public updateLogs(player: Player): void {}
  public expire(player: Player): void {}
}
