import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";

export class CactusNectar extends Consumable {
  constructor() {
    const description =
      "Extracted from a desert cactus, this nectar rejuvenates your body and clears your senses.";
    super("Cactus Nectar", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    let actingLog = ``;
    let affectedLog = `${player.getName()} drinks a Cactus Nectar.`;

    player.changeStat("health", 5);
    // Remove only one debuff
    const debuff = player
      .getStatuses()
      .find((status) => status.getType() === "DEBUFF");
    if (debuff) {
      player.removeStatus(debuff);
    }

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "CACTUS_NECTAR";
  }

  public getStatDescription(): string {
    return `Restores 5 Health and removes a debuff.`;
  }
}
