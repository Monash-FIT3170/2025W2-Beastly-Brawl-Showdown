import { Player } from "../player";
import { ConsumableState } from "/types/single/itemState";

export abstract class Consumable {
  protected name: string;
  protected description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public abstract getStatDescription(): string;

  public abstract consume(player: Player): void;

  public getState(): ConsumableState {
    return {
      name: this.name,
      description: this.description,
      statDescription: this.getStatDescription(),
      imageString: "OOZING_BLADE", //TO-DO: UPDATE IMAGE!
    };
  }
}
