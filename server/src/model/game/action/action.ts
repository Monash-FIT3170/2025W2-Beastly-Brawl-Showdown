import { Player } from "../player";

export abstract class Action {
  private name: string;
  private description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  public abstract prepare(actingPlayer: Player, affectedPlayer: Player): void;

  public abstract execute(actingPlayer: Player, affectedPlayer: Player): void;

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }
}
