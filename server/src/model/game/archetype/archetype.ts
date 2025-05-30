import { Action } from "../action/action";

export abstract class Archetype {
  private name: string;

  private ability: Action;

  private critRate: number; // Monsters have a default crit rate of 10%

  constructor(name: string, ability: Action, critRate: number = 10) {
    this.ability = ability;
    this.name = name;
    this.critRate = critRate;
  }

  public getName(): string {
    return this.name;
  }

  public getAbility(): Action {
    return this.ability;
  }

  public getCritRate(): number {
    return this.critRate;
  }
}
