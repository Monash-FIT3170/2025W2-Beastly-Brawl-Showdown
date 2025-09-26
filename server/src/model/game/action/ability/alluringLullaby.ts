import { Action } from "../action";
import { Player } from "../../player";
import { ActionIdentifier, ActionResult } from "/types/single/actionState";
import { AttackAction } from "../attack";
import { NullAction } from "../null";

export class AlluringLullaby extends Action {
  private affectedPlayerActions: Action[] = [];

  constructor() {
    super(
      ActionIdentifier.ALLURING_LULLABY,
      "Alluring Lullaby",
      "Sing a wicked little tune, confusing your opponent. If your opponent dares attack, they'll hit themselves instead",
      1
    );
    this.setDodgeable(false);
    this.damage = 5;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    this.affectedPlayerActions = affectedPlayer.getActions();
    const action = new AttackAction(1, 1, 1, 1);
    affectedPlayer.removeAction(action); //remove attack action - any other action can continue
    affectedPlayer.addAction(
      new NullAction(
        "Null",
        ActionIdentifier.NULL,
        "Your attacked yourself",
        `${affectedPlayer.getName()} attacked themself`,
        `${affectedPlayer.getName()} attacked themself`
      )
    );
  }

  public prepareAnimation(): string | [string, number] {
    return "ability";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    this.incCurrentUse(-1);

    this.affectedPlayerActions.forEach((action) => {
      // If the action is an attack, apply confusion
      if (action.getActionState().id === ActionIdentifier.ATTACK) {
        affectedPlayer.incHealth(-this.damage); //TODO: can they ever crit themselves?

        // Add logs
        actingPlayer.addLog(
          `You successfully used ${this.getName()}. They hit themselves in confusion.`
        );
        affectedPlayer.addLog(
          `${actingPlayer.getName()} used ${this.getName()}, you hit yourself in confusion.`
        );
        affectedPlayer.addBattleLog(
          `${actingPlayer.getName()} used ${this.getName()}, confusing ${affectedPlayer.getName()} and hitting themselves.`
        );
        this.executeBattleEffect(actingPlayer, affectedPlayer, true);
        affectedPlayer.addAnimation("damage");
      } else {
        // Add logs
        actingPlayer.addLog(`Your ${this.getName()} was ineffective!`);
        affectedPlayer.addLog(
          `${actingPlayer.getName()} used ${this.getName()}, it was ineffective.`
        );
        affectedPlayer.addBattleLog(
          `${actingPlayer.getName()} used ${this.getName()}, it was ineffective.`
        );
        this.executeBattleEffect(actingPlayer, affectedPlayer, false);
      }
    });

    //Assuming Confusion is not a status...
    return {
      appliedStatus: {
        success: false,
      },
    };
  }
}
