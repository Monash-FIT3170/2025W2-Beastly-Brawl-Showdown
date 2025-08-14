import { Player } from "../player";
import { Item } from "./item";

export class HealthPotion extends Item {
  constructor() {
    super("Health Potion");
  }

  public consume(player: Player): void {
    player.incHealth(5);
  }
}
