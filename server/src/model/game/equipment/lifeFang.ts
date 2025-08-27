import { Player } from "../player";
import { Equipment } from "./equipment";

export class LifeFang extends Equipment {
  constructor(stage: number) {
    super(
      "Life Fang",
      "Rumoured to be a fallen tooth from the greatest Bandit to roam the lands, this equipment gifts extra life.",
      LifeFang.calculateStrength(stage)
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

  private static calculateStrength(stage: number): number {
    //TODO: update formula - currently strength = playerHealth

    return stage * 5;
  }
}
