import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Poison } from "../status/poison";
import { Stun } from "../status/stun";
import { CroakOfStrengthBuff } from "../status/croakOfStrengthBuff";

export class CroakOfStrength extends Consumable {
  constructor() {
    const description =
      "A thick brown sludge that gurgles in a small bottle. You feel your throat tighten as you gulp it down.";
    super("Croak of Strength", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    player.addStatus(new CroakOfStrengthBuff(2))
    let actingLog = `You swallow it. Your throat tingleS and then RIBBIT! You feel strong. Embarrassingly strong.`;
    let affectedLog = `${player.getName()} lets out a enormous burp that shakes the ground. You freeze in disbelief.`;

    return [actingLog, affectedLog];
  }

  protected getImageString(): string {
    return "CROAK_OF_STRENGTH";
  }

  public getStatDescription(): string {
    return "Have 40% chance to inflict poison on opponent for 2 turns when attacking.";
  }
}