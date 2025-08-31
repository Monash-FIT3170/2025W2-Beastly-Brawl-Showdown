import { ActionIdentifier } from "../../../../../types/single/actionState";
import { Consumable } from "../consumables/consumable";
import { Player } from "../player";
import { Action } from "./action";

export class ConsumeAction extends Action {
  private consumableName: string;

  constructor(consumableName: string) {
    super(ActionIdentifier.CONSUME, "Consume", "Use given consumable!", 1);
    this.consumableName = consumableName;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    console.error("Consume Action Preparation Unimplemented");
  }
  public execute(actingPlayer: Player, affectedPlayer: Player): void {
    //TODO: handle this differently depending on the consumable
    //can add consumable types???
    actingPlayer.useConsumable(this.consumableName);

    //LOGS
    actingPlayer.addLog(`You used your ${this.consumableName} doing XX.`);
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.consumableName} doing XX!
      }.`
    );
    actingPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.consumableName} doing XX!.`
    );
  }
  public prepareAnimation(): string | [string, number] {
    console.error("Consume Action Animation Unimplemented");
    return "consume";
  }
}
