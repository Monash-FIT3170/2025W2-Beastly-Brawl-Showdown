import { Player } from "../player";
import { Equipment } from "./equipment";

export class BlazingGauntlets extends Equipment {
  constructor(stage: number) {
    super(
      "Blazing Gauntlets",
      "The burning flames on this weapon burns enemies for extra damage.",
      BlazingGauntlets.calculateStrength(stage)
    );
  }

  public equip(player: Player): void {
    //TODO: implement
    console.error("Equip Not Implemented - Blazing Gauntlets");
  }
  public unequip(player: Player): void {
    console.error("Un-Equip Not Implemented - Blazing Gauntlets");
  }

  public getStatDescription(): string {
    return "+" + this.strength + " Attack Damage";
  }

  private static calculateStrength(stage: number): number {
    //TODO: update formula - currently strength = stage
    return stage;
  }
}
