import { Player } from "../player";
import { Equipment } from "./equipment";

export class MagicShield extends Equipment {
  constructor() {
    super(
      "Magic Shield",
      "This sparkling shield holds magic that could defend you from any foe."
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
    // TODO: update formula for endless - needs playtesting with monster scaling
    this.strength = Math.min(stage * 0.5, 20);
  }

  protected getImageString(): string {
    return "MagicShield";
  }
}
