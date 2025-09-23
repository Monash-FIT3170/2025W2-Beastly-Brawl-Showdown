import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Stun } from "../status/stun";

export class SparklingFriend extends Consumable {
  constructor() {
    const description =
      "The firefly you saved from the purple slime. Call on it to burst with bright blue light blinding and stunning your enemy for one round.";
    super("Sparkling Friend", description, ConsumableType.ENEMY_INFLICT);
  }

  public getStatDescription(): string {
    return "Stun the opponent for 1 turn.";
  }
  public consume(player: Player): void {

    player.addStatus(new Stun(1));
    player.addLog(
      `You called the fire fly. It streaks to the foe's eyes and erupts in white light. Your enemy is stunned!`
    );
  }
  protected getImageString(): string {
    return "SPARKLING_FRIEND";
  }
}