import { StatusType } from "../../../../../types/single/statusType";
import { Action } from "../action/action";
import { Player } from "../player";
import { StartStatus } from "./startStatus";

export class InfinityAbility extends StartStatus {
  constructor(countDown: number = 5) {
    super(
      "Infinity Ability",
      "Replenish ability use every turn.",
      countDown,
      StatusType.BUFF
    );
  }

  public startingEffect(player: Player): void {
    const actions: Action[] = player.getMonster()?.getPossibleActions()!;
    actions.forEach((action) => {
      action.resetUse();
    });
  }

  public updateLogs(player: Player): void {
    player.addLog("All your abilities have been replenished!");
  }
  public expire(player: Player): void {}
}
