import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { HiccupOfDoomBuff } from "../status/hiccupOfDoomBuff";

export class HiccupOfDoom extends Consumable {
  constructor() {
    const description =
      "A volatile purple poison that smells faintly of burnt berries. The first hiccup feels cute. The next one isn't.";
    super("Hiccup Of Doom", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    player.addStatus(new HiccupOfDoomBuff(3))
    let actingLog = `You hiccuped. Something explodes. You're not sure who got hit.`;
    let affectedLog = `${player.getName()} hiccups, something nearby exploded!`;

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "HICCUP_OF_DOOM";
  }

  public getStatDescription(): string {
    return "Each hiccup deals 3 damage to the enemy or yourself";
  }
}