import { Player } from "../player";
import { Equipment } from "./equipment";

export class BasaltShield extends Equipment {
  constructor() {
    super(
      "Basalt Shield",
      "A heavy shield carved from volcanic rock. Its dark surface still holds faint heat from the lava flows."
    );
    //BRUZZ I WROTE FOE AGAIN...
  }

  public equip(player: Player): void {
    player.getMonster()?.incArmourClass(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.incArmourClass(-this.strength);
  }

  public getStatDescription(): string {
    return "+" + this.strength + " Armour Class";
  }

  public calculateStrength(stage: number): void {
    this.strength = Math.min(stage * 1.5, 10);
  }

  protected getImageString(): string {
    return "BASALT_SHIELD";
  }
}
