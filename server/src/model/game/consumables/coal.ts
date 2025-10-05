import { Player } from "../player";
import { SlimeBoost } from "../status/slimeBoost";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";

export class Coal extends Consumable {
  constructor() {
    const description =
      "There is no trick to this item, you have simply gotten unlucky.";
    super("Coal", description, ConsumableType.SELF_INFLICT);
  }

  public getStatDescription(): string {
    return "Does nothing.";
  }
  public consume(player: Player): [string, string] {
    //TODO: decide appropriate time for status
    player.addLog(`You use your coal. Leading to a feeble amount of nothing.`);

    let actingLog = `You use your coal. Leading to a feeble amount of nothing.`;
    let affectedLog = `${player.getName()} uses coal from their backpack!`;
    return [actingLog, affectedLog];
  }
  protected getImageString(): string {
    return "COAL";
  }
}
