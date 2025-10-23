import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Poison } from "../status/poison";
import { GlowOfInsightBuff } from "../status/glowOfInsightBuff";

export class GlowOfInsight extends Consumable {
  constructor() {
    const description =
      "A bright yellow poison that glows when shaken. When swallowed, your whole body begins to light up.";
    super("Glow Of Insight", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    player.addStatus(new GlowOfInsightBuff(2))
    let actingLog = `You glow like a lantern, sharp and radiant, but hard to miss.`;
    let affectedLog = `${player.getName()} glows brightly, their every move easy to spot.`;

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "GLOW_OF_INSIGHT";
  }

  public getStatDescription(): string {
    return "+5 attack, -3 armour";
  }
}