import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Stun } from "../status/stun";
import { SandyEyes } from "../status/sandyEyes";

export class DuneDust extends Consumable {
  constructor() {
    const description =
      "A handful of glimmering dust. Disorients your foe with mirages and hallucinations.";
    super("Dune Dust", description, ConsumableType.ENEMY_INFLICT);
  }

  public getStatDescription(): string {
    return "Confuse the opponent for 3 turns.";
  }

  public consume(player: Player): [string, string] {
    player.addStatus(new SandyEyes(3)); // replace with Confused once implemented

    let actingLog = `You throw dune dust at your opponent. Your enemy is confused!`;
    let affectedLog = `Dune dust gets into your eye. You are confused!`;
    return [actingLog, affectedLog];
  }
  protected getImageString(): string {
    return "DUNE_DUST";
  }
}
