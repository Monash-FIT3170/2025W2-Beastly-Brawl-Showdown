import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Poison } from "../status/poison";

export class BlueCrystal extends Consumable {
  constructor() {
    const description =
      "A cold, glassy shard that hums with quiet energy. When crushed, it releases a cleansing wave that strips away every effect";
    super("Blue Crystal", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    player.clearStatuses()
    let actingLog = `You crush the Blue Crystal. All statuses fade from your body.`;
    let affectedLog = `${player.getName()} shatters a Blue Crystal, every status disappears from them.`;

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "BLUE_CRYSTAL";
  }

  public getStatDescription(): string {
    return "Removes all statuses.";
  }
}
