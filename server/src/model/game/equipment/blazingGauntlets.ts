import { Player } from "../player";
import { Equipment } from "./equipment";

export class BlazingGauntlets extends Equipment {
  constructor() {
    super(
      "Blazing Gauntlets",
      "The burning flames on this weapon burns enemies for extra damage."
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.getAttackAction().incrementDamageDealt(this.strength);
  }

  public unequip(player: Player): void {
    player.getMonster()?.getAttackAction().incrementDamageDealt(-this.strength);
  }

  public getStatDescription(): string {
    return "+" + this.strength + " Attack Damage";
  }

  public calculateStrength(stage: number): void {
    this.strength = stage;
  }

  protected getImageString(): string {
    return "BLAZING_GAUNTLETS";
  }
}
