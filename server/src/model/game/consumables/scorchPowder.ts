import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";
import { Burn } from "../status/burn";

export class ScorchPowder extends Consumable {
  constructor() {
    const description =
      "A pouch of fine, ember dust that bursts into a flame when thrown. Enemies struck by this powder will suffer a lasting burn.";
    super("Scorch Powder", description, ConsumableType.ENEMY_INFLICT);
  }

  public getStatDescription(): string {
    return "Burns your enemy for 3 turns.";
  }
  public consume(player: Player): [string, string] {
    player.addStatus(new Burn(3));

    let actingLog = `You threw the Scorch Powder at your enemy. They will now burn for three turns!`;
    let affectedLog = `You have been burned for three turns by Scorch Powder.`;
    return [actingLog, affectedLog];
  }
  protected getImageString(): string {
    return "SCORCH_POWDER";
  }
}
