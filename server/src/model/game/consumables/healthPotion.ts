import { Player } from "../player";
import { Consumable } from "./consumable";

export class PercentageHealthPotion extends Consumable {
  private percent: number;

  constructor(name: string, percent: number) {
    super(name);
    this.percent = percent;
  }

  public consume(player: Player): void {
    const healAmount = Math.ceil(
      player.getMonster()!.getMaxHealth() * this.percent
    );
    player.incHealth(healAmount);
  }
}
