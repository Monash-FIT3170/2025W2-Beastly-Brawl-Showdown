import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Player } from "../player";
import { Poison } from "../status/poison";

export class FroggySlime extends Consumable {
  constructor() {
    const description =
      "A small bottle of purple liquid gathered from the giant frog's trail.";
    super("Froggy Slime", description, ConsumableType.ENEMY_INFLICT);
  }

  public getStatDescription(): string {
    return "Poison the enemy for 5 rounds.";
  }

  public consume(player: Player): [string, string] {
    //TODO: decide appropriate time for status
    player.addStatus(new Poison(5));


    let actingLog = `You toss the bottle, and it bursts over your opponent with a loud SPLASH! The enemy is poisoned`;
    let affectedLog = `${player.getName()} used ${
      this.name
    } to poison you.`;
    return [actingLog, affectedLog];
  }
  protected getImageString(): string {
    return "FROGGY_SLIME";
  }
}
