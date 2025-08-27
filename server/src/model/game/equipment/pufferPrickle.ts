import { Player } from "../player";
import { Equipment } from "./equipment";

export class PufferPrickle extends Equipment {
  constructor() {
    super(
      "Puffer Prickle",
      "Let enemies feel the wrath of a once furious pufferfish.."
    );
  }

  public equip(player: Player): void {
    //TODO: implement
    console.error("Equip Not Implemented - Puffer Prickle");
  }
  public unequip(player: Player): void {
    console.error("Un-Equip Not Implemented - Puffer Prickle");
  }
  public getStatDescription(): string {
    return "+" + this.strength + "% Critical Hit Chance";
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage * 3;
  }
}
