import { Player } from "../player";

export abstract class Equipment {
  protected name: string;
  protected description: string;
  protected strength: number;
  //TODO: need to consider scaling - will it be by stage ?
  //do i add strength to equipment or to each individual one? because maybe not all scale??

  constructor(name: string, description: string, strength?: number) {
    this.name = name;
    this.description = description;
    this.strength = strength ?? 1;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStrength(): number {
    return this.strength;
  }

  public updateStrength(strength: number): void {
    this.strength = strength;
  }

  public abstract equip(player: Player): void;

  public abstract unequip(player: Player): void;
}
