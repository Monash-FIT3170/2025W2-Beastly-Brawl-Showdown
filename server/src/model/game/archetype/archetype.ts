import { Action } from "../action/action";

export abstract class Archetype {
  private name: string;

  private ability: Action;

  constructor(name: string, ability: Action) {
    this.ability = ability;
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getAbility(): Action {
    return this.ability;
  }
}
