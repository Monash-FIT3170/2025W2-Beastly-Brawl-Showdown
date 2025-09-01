import { Player } from "../player";
import { Equipment } from "./equipment";

export class BlazingGauntlets extends Equipment {
  constructor() {
    super(
      "Blazing Gauntlets",
      "The burning flames on this weapon burns enemies for extra damage."
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

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }

  protected getImageString(): string {
    return "item";
  }
}
