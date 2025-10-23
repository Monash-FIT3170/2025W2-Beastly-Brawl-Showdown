import { Player } from "../player";
import { Equipment } from "./equipment";

export class RedCrystal extends Equipment {
  constructor() {
    super(
      "Red Crystal",
      "A warm shard that hums faintly with energy. Increases your attack while equipped."
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
    this.strength = Math.min(stage * 0.5, 10);
  }

  protected getImageString(): string {
    return "RED_CRYSTAL";
  }
}