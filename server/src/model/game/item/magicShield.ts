import { Player } from "../player";
import { Equipment } from "./equipment";

export class MagicShield extends Equipment {
  constructor(strength: number) {
    super("Magic Shield", "AC Boost", strength);
  }

  public equip(player: Player): void {
    player.getMonster()?.incArmourClass(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.incArmourClass(-this.strength);
  }
}
