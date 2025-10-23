import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Poison } from "../status/poison";
import { Strong } from "../status/strong";

export class BlackCrystal extends Consumable {
  constructor() {
    const description =
      "A heavy shard shacking with unstable force. You feel a rise of power within your self.";
    super("Black Crystal", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    player.addStatus(new Strong(2, 0))
    let actingLog = `You crush the Black Crystal, dark energy floods your veins.`;
    let affectedLog = `${player.getName()} shatters a Black Crystal. The air hums with dangerous energy.`;

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "BLACK_CRYSTAL";
  }

  public getStatDescription(): string {
    return "Strengthens you with dark magic.";
  }
}
