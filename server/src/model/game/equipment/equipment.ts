import { Player } from "../player";
import { EquipmentState } from "/types/single/itemState";

export abstract class Equipment {
  protected name: string;
  protected description: string;
  protected strength: number = 1;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
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

  public abstract getStatDescription(): string;

  public abstract equip(player: Player): void;

  public abstract unequip(player: Player): void;

  public abstract calculateStrength(stage: number): void;

  public getState(): EquipmentState {
    return {
      name: this.name,
      description: this.description,
      statDescription: this.getStatDescription(),
      image: "OOZING_BLADE", //TO-DO: UPDATE IMAGE!
    };
  }
}
