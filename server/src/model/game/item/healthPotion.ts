import { Player } from "../player";
import { Consumable } from "./consumable";

export class HealthPotion extends Consumable {
  constructor() {
    super("Health Potion");
  }

  public consume(player: Player): void {
    player.getMonster().incHealth(5);
  }
}
