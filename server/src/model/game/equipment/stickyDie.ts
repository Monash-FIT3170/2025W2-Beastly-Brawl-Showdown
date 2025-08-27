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
    //TODO: implement
    console.error("Equip Not Implemented - Sticky Die");
  }
  public unequip(player: Player): void {
    console.error("Un-Equip Not Implemented - Sticky Die");
  }

  public getStatDescription(): string {
    return "New Minimum Roll of:" + this.strength;
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage + 2;
  }
}
