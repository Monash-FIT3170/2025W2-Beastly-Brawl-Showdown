import { Player } from "../player";
import { Equipment } from "./equipment";

export class MagicShield extends Equipment {
  constructor(stage: number) {
    super(
      "Magic Shield",
      "This sparkling shield holds magic that could defend you from any foe.",
      MagicShield.calculateStrength(stage)
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

  private static calculateStrength(stage: number): number {
    //TODO: update formula - currently strength = stage
    return stage * 2;
  }
}
