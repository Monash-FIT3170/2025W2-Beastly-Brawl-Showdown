import { NullAction } from "../action/null";
import { Player } from "../player";
import { Status } from "./status";
import { ActionIdentifier } from "/types/single/actionState";
import { StatusType } from "/types/single/statusType";

export class Stun extends Status {
  constructor(countDown: number) {
    super("Stun", "Monster is unable to attack", countDown, StatusType.DEBUFF);
  }

  //TODO: implement stun
  public effect(player: Player): void {
    //IDEALLY:
    //grey out moves / make buttons unclickable, forcing them to do nothing
    const temporaryActions = [];

    // temporaryActions.push(new AttackAction(attackBonus, this.critRate));
    // temporaryActions.push(new DefendAction(armourClass));
    // temporaryActions.push(ability);
    // temporaryActions.push(archetype.getAbility());
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
