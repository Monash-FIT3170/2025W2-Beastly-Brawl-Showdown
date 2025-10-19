import { Player } from "../player";
import { Equipment } from "./equipment";

export class PurpleCrystal extends Equipment {
  constructor() {
    super(
      "Purple Crystal",
      "A dense crystal shining with putple sparks. Raises your amour class while equipped."
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
    this.strength = Math.min(stage * 0.5, 10);
  }

  protected getImageString(): string {
    return "PURPLE_CRYSTAL";
  }
}