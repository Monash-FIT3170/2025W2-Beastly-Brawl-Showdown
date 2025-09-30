import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";
import { NullAction } from "../action/null";
import { Player } from "../player";
import { StartStatus } from "./startStatus";
import { ActionIdentifier } from "/types/single/actionState";

export class SandyEyes extends StartStatus {
  constructor(countDown: number) {
    super(
      "Sandy Eyes",
      "You can't use your abilities.",
      countDown,
      StatusType.DEBUFF
    );
  }

  public startingEffect(player: Player): void {
    const normalActions = player.getMonster()?.getPossibleActions();
    const temporaryActions: Action[] = [];

    //actions that won't be replaced with sandy
    const keep = [
      ActionIdentifier.ATTACK,
      ActionIdentifier.DEFEND,
      ActionIdentifier.CONSUME,
    ];

    normalActions?.forEach((action) => {
      //passive actions can't be replaced.
      if (action.getMaxUse() > 0 && !keep.includes(action.getId())) {
        temporaryActions.push(new NullAction("Sandy", ActionIdentifier.SAND));
      } else {
        temporaryActions.push(action);
      }
    });

    player.getMonster()?.setTemporaryActions(temporaryActions);
    console.log(`${player.getName()}'s eyes are sandy. Cannot use abilties.`);
  }

  public updateLogs(player: Player): void {}
  public expire(player: Player): void {}
}
