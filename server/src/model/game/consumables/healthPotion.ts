import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";

export class PercentageHealthPotion extends Consumable {
  private percent: number;
  private image: string;

  constructor(name: string, percent: number, image?: string) {
    //btw feel free to change descriptions this is just for now
    const description =
      "A vibrant liquid stored in an unsuspecting vial, there are rumours this red liquid cures even the toughest wounds.";
    super(name, description, ConsumableType.SELF_INFLICT);
    this.percent = percent;
    this.image = image ?? "HEALTHPOTIONFULL";
  }

  public consume(player: Player): void {
    const healAmount = Math.ceil(
      player.getMonster()!.getMaxHealth() * this.percent
    );
    player.incHealth(healAmount);
    player.addLog(
      `You consumed the Health Potion gaining a delicious ${healAmount} HP`
    );
  }

  public getStatDescription(): string {
    return "Heal " + this.percent * 100 + "% of your HP";
  }

  protected getImageString(): string {
    return this.image;
  }
}
