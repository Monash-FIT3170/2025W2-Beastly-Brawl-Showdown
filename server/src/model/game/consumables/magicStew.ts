import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Poison } from "../status/poison";

export class MagicStew extends Consumable {
  constructor() {
    const description =
      "A bottle of suspicious liquid. Could be good... or bad.";
    super("Magic Stew", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    let actingLog = ``;
    let affectedLog = `${player.getName()} drinks a Magic Stew.`;

    const chance = Math.random();
    if (chance < 0.5) {
      //good effect
      const statuses = player.getStatuses();
      const poisonIndex = statuses.findIndex(
        (s: any) => s instanceof Poison || s.getName?.() === "Poison"
      );

      if (poisonIndex !== -1) {
        player.removeStatus(statuses[poisonIndex]);
        actingLog = "You sip the stew. The poison is cured.";
        // player.addLog("You sip the stew. The poison is cured.");
      } else {
        actingLog =
          "You sip the stew. Tastes strange... nothing seems to happen.";
        // player.addLog(
        // "You sip the stew. Tastes strange... nothing seems to happen."
        // );
      }
    } else {
      // bad effect
      player.incHealth(-5);
      actingLog = "You gulp the stew. Your stomach grumbles! You loss 5HP.";
      // player.addLog("You gulp the stew. Your stomach grumbles! You loss 5HP.");
    }

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "MAGIC_STEW";
  }

  public getStatDescription(): string {
    return "Unpredictable effect.";
  }
}
