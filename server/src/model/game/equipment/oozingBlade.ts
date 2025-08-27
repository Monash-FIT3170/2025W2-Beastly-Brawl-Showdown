import { Player } from "../player";
import { Equipment } from "./equipment";

export class OozingBlade extends Equipment {
  constructor(stage: number) {
    super(
      "Oozing Blade",
      "Forged from slime residue and covered in a constant slick of ooze. This blade reeks of muck, yet its slimy edge is clean to the cut.",
      OozingBlade.calculateStrength(stage)
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

  private static calculateStrength(stage: number): number {
    //TODO: update formula - currently strength = stage
    return stage;
  }
}
