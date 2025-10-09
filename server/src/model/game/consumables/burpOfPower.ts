import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Poison } from "../status/poison";
import { Stun } from "../status/stun";

export class BurpOfPower extends Consumable {
  constructor() {
    const description =
      "A fizzy blue poison that bubbles constantly. When swallowed, it builds unbearable pressure in your stomach.";
    super("Burp of Power", description, ConsumableType.ENEMY_INFLICT);
  }

  public consume(player: Player): [string, string] {
    player.addStatus(new Stun(2))
    let actingLog = `You burp thunderously! The swamp trembles, your opponent is stunned for 2 turns.`;
    let affectedLog = `${player.getName()} lets out a enormous burp that shakes the ground. You freeze in disbelief.`;

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "BURP_OF_POWER";
  }

  public getStatDescription(): string {
    return "Stuns your opponent for 2 turns.";
  }
}