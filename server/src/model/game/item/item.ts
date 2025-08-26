import { Player } from "../player";

export abstract class Item {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public abstract consume(player: Player): void;
}
