import { Player } from "../player";
import { Equipment } from "./equipment";

export class PufferPrickle extends Equipment {
  constructor(stage: number) {
    super(
      "Puffer Prickle",
      "Let enemies feel the wrath of a once furious pufferfish..",
      PufferPrickle.calculateStrength(stage)
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

  private static calculateStrength(stage: number): number {
    //TODO: update formula - currently strength = stage
    return stage * 3;
  }
}
