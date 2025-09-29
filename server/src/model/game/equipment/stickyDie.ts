import { Player } from "../player";
import { Equipment } from "./equipment";

export class StickyDie extends Equipment {
  constructor() {
    super(
      "Sticky Die",
      "It seems the slimes have gotten ahold of your die, allowing each roll to stick a little bit higher."
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.getAttackAction().incrementMinRoll(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.getAttackAction().incrementMinRoll(-this.strength);
  }

  public getStatDescription(): string {
    return "New Minimum Roll of:" + this.strength;
  }

  public calculateStrength(stage: number): void {
    this.strength = Math.min(stage + 2, 10);
  }

  protected getImageString(): string {
    return "STICKY_DIE";
  }
}
