import { NullAction } from "../action/null";
import { Player } from "../player";
import { Status } from "./status";
import { StartStatus } from "./startStatus";
import { ActionIdentifier } from "/types/single/actionState";
import { StatusType } from "/types/single/statusType";

export class Stun extends StartStatus {
  constructor(countDown: number) {
    super("Stun", "Monster is unable to attack", countDown +1, StatusType.DEBUFF);
  }


  public startingEffect(player: Player): void {
    console.error("DEBUG: STUN STARTING EFFECT")
    const temporaryActions = [];
    temporaryActions.push(new NullAction("Stunned", ActionIdentifier.STUNNED));
    temporaryActions.push(new NullAction("Stunned", ActionIdentifier.STUNNED));
    temporaryActions.push(new NullAction("Stunned", ActionIdentifier.STUNNED));
    temporaryActions.push(new NullAction("Stunned", ActionIdentifier.STUNNED));

    player.getMonster()?.setTemporaryActions(temporaryActions);
    console.log(`${player.getName()} is stunned. Cannot make a move.`);
  }

  public updateLogs(player: Player): void {
    //unnecessary as user feedback is obvious from the action footer.
  }
  public expire(): void {
    console.error("Method not implemented.");
  }
}
