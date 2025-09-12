import { Player } from "../player";
import { Equipment } from "./equipment";

export class LifeFang extends Equipment {
  constructor() {
    super(
      "Life Fang",
      "Rumoured to be a fallen tooth from the greatest Bandit to roam the lands, this equipment gifts extra life."
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
    //TODO: update formula - currently strength = playerHealth

    this.strength = stage;
  }

  protected getImageString(): string {
    return "lifeFang";
  }
}
