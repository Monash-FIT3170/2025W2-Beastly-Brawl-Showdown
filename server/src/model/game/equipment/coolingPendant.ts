import { Player } from "../player";
import { Equipment } from "./equipment";

export class CoolingPendant extends Equipment {
  constructor() {
    super(
      "Cooling Pendant",
      "A chilled silver talisman that keeps the wearer cool and adds a small bonus to AC."
    );
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

  public calculateStrength(stage: number): void {
    // TODO: update formula for endless - needs playtesting with monster scaling
    this.strength = Math.min(stage, 10);
  }

  protected getImageString(): string {
    return "COOLING_PENDANT";
  }
}
