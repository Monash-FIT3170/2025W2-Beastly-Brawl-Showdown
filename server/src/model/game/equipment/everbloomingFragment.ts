import { Player } from "../player";
import { Equipment } from "./equipment";
import { Resurrection } from "../status/resurrection";

export class EverbloomingFragment extends Equipment {
  constructor() {
    super(
      "Everblooming Fragment",
      "A crystal shard formed from the heart of an eternal lotus. Warm to the touch with a chance of resurrection."
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.incCritRate(this.strength);
    player.addStatus(new Resurrection());
  }
  public unequip(player: Player): void {
    player.getMonster()?.incCritRate(this.strength);
  }

  public getStatDescription(): string {
    return (
      "+" +
      this.strength +
      " Armour Class and 30% chance to resurrect with 50% HP"
    );
  }

  public calculateStrength(stage: number): void {
    // TODO: update formula for endless - needs playtesting with monster scaling
    this.strength = Math.min(stage * 2, 10);
  }

  protected getImageString(): string {
    return "PURPLE CRYSTAL";
  }
}
