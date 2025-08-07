import { NullAction } from "../action/null";
import { Player } from "../player";
import { Status } from "./status";

export class Stun extends Status {
  constructor(countDown: number) {
    super("Stun", "Monster is unable to attack", countDown);
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
    temporaryActions.push(new NullAction());
    temporaryActions.push(new NullAction());
    temporaryActions.push(new NullAction());
    temporaryActions.push(new NullAction());

    player.getMonster()?.setTemporaryActions(temporaryActions);
    console.log(`${player.getName()} is stunned. Cannot make a move.`);
  }
}
