import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Poison } from "../status/poison";

export class GreyCrystal extends Consumable {
  constructor() {
    const description =
      "A dull grey stone with no glow or warmth. It looks ordinary...";
    super("Grey Crystal", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    player.clearStatuses()
    let actingLog = `You pick up a Gray Crystal. Nothing happens.`;
    let affectedLog = `${player.getName()} examines a Gray Crystal. It does absolutely nothing.`;

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "GREY_CRYSTAL";
  }

  public getStatDescription(): string {
    return "Just an ordinary stone";
  }
}
