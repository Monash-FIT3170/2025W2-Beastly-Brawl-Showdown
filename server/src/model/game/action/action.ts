import { Player } from "../player";
import { ActionIdentifier, ActionState } from "/types/single/actionState";

export abstract class Action {
  private id: ActionIdentifier;
  private name: string;
  private description: string;

  private currentUse: number;
  private maxUse: number;

  constructor(
    id: ActionIdentifier,
    name: string,
    description: string,
    maxUse: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currentUse = maxUse;
    this.maxUse = maxUse;
  }

  protected incCurrentUse(value: number): void {
    this.currentUse += value;
  }

  public getCurrentUse(): number {
    return this.currentUse;
  }

  public getMaxUse(): number {
    return this.maxUse;
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
      currentUse: this.currentUse,
      maxUse: this.maxUse,
    };
  }
}
