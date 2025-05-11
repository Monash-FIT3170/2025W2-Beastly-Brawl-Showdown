import { Player } from "../player";
import { ActionIdentifier, ActionState } from "/types/single/actionState";

export abstract class Action {
  private id: ActionIdentifier;
  private name: string;
  private description: string;

  constructor(id: ActionIdentifier, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public abstract prepare(actingPlayer: Player, affectedPlayer: Player): void;

  public abstract execute(actingPlayer: Player, affectedPlayer: Player): void;

  public getId(): ActionIdentifier {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getActionState(): ActionState {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}
