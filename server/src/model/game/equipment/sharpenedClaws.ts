import { Player } from "../player";
import { Equipment } from "./equipment";

export class SharpenedClaws extends Equipment {
  constructor(stage: number) {
    super(
      "Sharpened Claws",
      "These claws give an extra sting on every attack.",
      SharpenedClaws.calculateStrength(stage)
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.incAttackBonus(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.incAttackBonus(-this.strength);
  }

  public getStatDescription(): string {
    return "+" + this.strength + " Attack Bonus";
  }

  private static calculateStrength(stage: number): number {
    //TODO: update formula - currently strength = stage
    return stage;
  }
}
