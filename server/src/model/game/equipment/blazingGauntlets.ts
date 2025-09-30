import { Player } from "../player";
import { Equipment } from "./equipment";

export class BlazingGauntlets extends Equipment {
  constructor() {
    super(
      "Blazing Gauntlets",
      "These gauntlets were made from raw molten metal, at the Cinder Forge. The strength of the metal deals more damage than any."
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
