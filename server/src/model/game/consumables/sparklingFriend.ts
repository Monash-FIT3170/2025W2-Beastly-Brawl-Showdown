import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Stun } from "../status/stun";

export class SparklingFriend extends Consumable {
  constructor() {
    const description =
      "The firefly you saved from the purple slime. Call on it to burst with bright blue light blinding and stunning your enemy for 2 rounds.";
    super("Sparkling Friend", description, ConsumableType.ENEMY_INFLICT);
  }

  public getStatDescription(): string {
    return "Stun the opponent for 2 turns.";
  }
  public consume(player: Player): [string, string] {
    player.addStatus(new Stun(2));
    // player.addLog(
    //   `You called the fire fly. It streaks to the foe's eyes and erupts in white light. Your enemy is stunned!`
    // );

    let actingLog = `You called the fire fly. It streaks to the foe's eyes and erupts in white light. Your enemy is stunned!`;
    let affectedLog = `A firefly erupts in a white light. You are stunned!`;
    return [actingLog, affectedLog];
  }
  protected getImageString(): string {
    return "SPARKLING_FRIEND";
  }
}
