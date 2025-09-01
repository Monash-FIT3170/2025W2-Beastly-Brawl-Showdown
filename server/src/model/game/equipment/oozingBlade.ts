import { Player } from "../player";
import { Equipment } from "./equipment";

export class OozingBlade extends Equipment {
  constructor() {
    super(
      "Oozing Blade",
      "Forged from slime residue and covered in a constant slick of ooze. This blade reeks of muck, yet its slimy edge is clean to the cut."
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.incAttackBonus(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.incAttackBonus(-this.strength);
  }

  public getStatDescription(): string {
    return "Increase Attack Bonus by +" + this.strength;
  }

  public calculateStrength(stage: number): void {
    this.strength = stage;
  }

  protected getImageString(): string {
    return "oozingBlade";
  }
}
