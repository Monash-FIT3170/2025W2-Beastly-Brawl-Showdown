import { Player } from "../player";
import { Equipment } from "./equipment";

export class WitherbindBracelet extends Equipment {
  constructor() {
    super(
      "Witherbind Bracelet",
      "A bracelet woven from swamp vines, still prickly to the touch. It digs into your skin, keeping you awake and more reactive in battle."
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.incCritRate(this.strength);
  }

  public unequip(player: Player): void {
    player.getMonster()?.incCritRate(-this.strength);
  }

  public getStatDescription(): string {
    return "+" + this.strength + " Critical Hit Rate";
  }

  public calculateStrength(stage: number): void {
    this.strength =Math.min(stage+2, 40);
  }

  protected getImageString(): string {
    return "WITHERBIND_BRACELETE";
  }
}
