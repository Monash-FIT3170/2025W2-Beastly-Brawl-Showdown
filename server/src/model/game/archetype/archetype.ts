import { iAbility } from "../action/ability/iAbility";

export abstract class Archetype {
  private name: string;

  private ability: iAbility;

  constructor(name: string, ability: iAbility) {
    this.ability = ability;
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getAbility(): iAbility {
    return this.ability;
  }
}
