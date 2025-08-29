import { Action } from "./action";
import { Player } from "../player";
import { ActionIdentifier } from "/types/single/actionState";

export class NullAction extends Action {
  private actingMessage: string | null;
  private affectedMessage: string | null;
  private battleLogMessage: string | null;

  constructor(
    name: string = "Null",
    actionIdentifier: ActionIdentifier = ActionIdentifier.NULL,
    actingMessage: string | null = null,
    affectedMessage: string | null = null,
    battleLogMessage: string | null = null
  ) {
    super(actionIdentifier, name, "No action", Infinity);
    this.actingMessage = actingMessage;
    this.affectedMessage = affectedMessage;
    this.battleLogMessage = battleLogMessage;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {}

  public prepareAnimation(): string | [string, number] {
    return "NullAction_Animation";
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.addLog(
      `${this.actingMessage ? this.actingMessage + " " : ""}You did nothing.`
    );
    affectedPlayer.addLog(
      `${
        this.affectedMessage ? this.affectedMessage + " " : ""
      }${actingPlayer.getName()} did nothing.`
    );
    actingPlayer.addBattleLog(
      `${
        this.battleLogMessage ? this.battleLogMessage + " " : ""
      }${actingPlayer.getName()} did nothing.`
    );
  }
}
