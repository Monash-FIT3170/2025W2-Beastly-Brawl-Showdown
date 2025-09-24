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
  public consume(player: Player): void {
    player.addStatus(new Burn(3));
    player.addLog(
      `You threw the scorch powder at your enemy. They will now burn for three turns!`
    );
  }
  protected getImageString(): string {
    return "SCORCH_POWDER";
  }
}
