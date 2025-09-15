import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";
import { NullAction } from "../action/null";
import { Player } from "../player";
import { Status } from "./status";
import { ActionIdentifier } from "/types/single/actionState";

export class LakeCurse extends Status {
  constructor(countDown: number) {
    super(
      "Lake Curse",
      "Monster's actions may be disabled at random",
      countDown,
      StatusType.DEBUFF
    );
  }

  //TODO: implement stun
  public effect(player: Player): void {
    //IDEALLY:
    //grey out moves / make buttons unclickable, forcing them to do nothing
    const actionCopy = [...player.getMonster()?.getPossibleActions()!];

    let temporaryActions: Action[] = [];

    actionCopy.forEach((action) => {
      if (action.getCurrentUse() > 0) {
        const lakeOverride = Math.floor(Math.random() * 4);
        if (lakeOverride === 0) {
          temporaryActions = [
            ...temporaryActions,
            new NullAction("Cursed", ActionIdentifier.LAKE_CURSE),
          ];
          console.log("Override", temporaryActions);
        } else {
          temporaryActions = [...temporaryActions, action];
          console.log("Not override", temporaryActions);
        }
      } else {
        temporaryActions = [...temporaryActions, action];
      }
    });

    player.getMonster()?.setTemporaryActions(temporaryActions);
    console.log(
      `${player.getName()} is cursed!. Their actions may be restricted.`
    );
  }
  public updateLogs(player: Player): void {
    //unnecessary as user feedback is obvious from the action footer.
  }
  public expire(): void {
    console.error("Method not implemented.");
  }
}
