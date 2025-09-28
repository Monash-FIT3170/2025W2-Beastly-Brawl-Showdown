import { Player } from "../player";
import { Equipment } from "./equipment";

export class SlimyHeart extends Equipment {
  constructor() {
    super(
      "Slimy Heart",
      "A hardened crystal formed from the remains of a swamp slime. Faintly glowing, as if holding the memories of the swamp's magic.."
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.incMaxHealth(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.incMaxHealth(-this.strength);
  }

  public getStatDescription(): string {
    return "+" + this.strength + " Max HP";
  }

  public calculateStrength(stage: number): void {
    
    this.strength = Math.min(stage, 15);
  }

  protected getImageString(): string {
    return "SLIMY_HEART";
  }
}