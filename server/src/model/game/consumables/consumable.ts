import { Player } from "../player";
import { ConsumableState } from "/types/single/itemState";

export abstract class Consumable {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public abstract consume(player: Player): void;

  public getState(): ConsumableState {
    return {
      name: this.name,
      description: "TO DO: DESCRIPTION",
      image: "OOZING_BLADE",
    };
  }
}
