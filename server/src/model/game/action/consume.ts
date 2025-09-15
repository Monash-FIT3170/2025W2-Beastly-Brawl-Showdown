import { error } from "console";
import {
  ActionIdentifier,
  ActionResult,
} from "../../../../../types/single/actionState";
import { Consumable } from "../consumables/consumable";
import { Player } from "../player";
import { Action } from "./action";
import { ConsumableType } from "/types/single/itemState";

export class ConsumeAction extends Action {
  private consumable: Consumable;

  constructor(consumable: Consumable) {
    super(
      ActionIdentifier.CONSUME,
      "Consume",
      "Use given consumable!",
      1,
      false
    );
    this.consumable = consumable;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    console.error("Consume Action Preparation Unimplemented");
  }
  public execute(actingPlayer: Player, affectedPlayer: Player): ActionResult {
    if (this.consumable?.getType() == ConsumableType.SELF_INFLICT) {
      this.consume(actingPlayer, this.consumable);
    } else if (this.consumable?.getType() == ConsumableType.ENEMY_INFLICT) {
      this.consume(affectedPlayer, this.consumable);
    } else {
      console.error("Consumable does not have valid type.");
    }

    //LOGS
    affectedPlayer.addLog(
      `${actingPlayer.getName()} used ${this.consumable.getName()} from their backpack!
      }.`
    );
    actingPlayer.addBattleLog(
      `${actingPlayer.getName()} used ${this.consumable.getName()} from their backpack!`
    );

    return {
      appliedStatus: {
        success: true,
      },
    };
  }

  public prepareAnimation(): string | [string, number] {
    console.error("Consume Action Animation Unimplemented");
    return "consume";
  }

  private consume(player: Player, consumable: Consumable): void {
    consumable.consume(player);
    console.log(`${consumable.getName()} has been used on ${player.getName()}`);
  }
}
