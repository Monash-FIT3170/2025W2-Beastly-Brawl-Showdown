import { Player } from "../player";
import { Equipment } from "./equipment";

export class SharpenedClaws extends Equipment {
  constructor() {
    super(
      "Sharpened Claws",
      "These claws give an extra sting on every attack."
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

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }
}
