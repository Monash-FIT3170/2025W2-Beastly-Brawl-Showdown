import { Player } from "../player";
import { Equipment } from "./equipment";

export class Sword extends Equipment {
  constructor(strength: number) {
    super("Sword", "An epic sword ..... boosting your attack...", strength);
  }

  public equip(player: Player): void {
    player.getMonster()?.incAttackBonus(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.incAttackBonus(-this.strength);
  }
}
