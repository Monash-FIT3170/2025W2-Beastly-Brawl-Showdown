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
  public consume(player: Player): void {
    //TODO: decide appropriate time for status
    player.addLog(`You use your coal. Leading to a feeble amount of nothing.`);
  }
  protected getImageString(): string {
    return "COAL";
  }
}
