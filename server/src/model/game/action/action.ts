import { Player } from "../player";

export abstract class Action {
  private name: string;
  private description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  // TODO: What do we pass through? I assume if a battle is just a 1v1, we can just pass through the acting player and the affected player, at least for now?
  public execute(actingPlayer: Player, affectedPlayer: Player): void {}

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }
}
