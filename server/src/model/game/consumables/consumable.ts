import { Player } from "../player";
import { ConsumableState, ConsumableType } from "/types/single/itemState";

export abstract class Consumable {
  protected name: string;
  protected description: string;
  protected type: ConsumableType;
  protected animation: string = ""; // blank string results in no animation!

  constructor(name: string, description: string, type: ConsumableType) {
    this.name = name;
    this.description = description;
    this.type = type;
  }

  public nameToId(): string {
    return this.name.trim().toLowerCase().replace(/\s+/g, "_");
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getType(): ConsumableType {
    return this.type;
  }

  public abstract getStatDescription(): string;

  public abstract consume(player: Player): void;

  protected abstract getImageString(): string;

  public getAnimationString(): string {
    //TODO: in constructor - edit animations for any consumables we want :)
    return this.animation;
  }

  public getState(): ConsumableState {
    return {
      name: this.name,
      description: this.description,
      statDescription: this.getStatDescription(),
      imageString: this.getImageString(),
      type: this.type,
    };
  }
}
