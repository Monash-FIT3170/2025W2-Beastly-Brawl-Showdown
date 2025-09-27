import { Action } from "../action/action";
import { ArchetypeIdentifier, ArchetypeInfo } from "/types/single/monsterState";

export abstract class Archetype {
  private archetypeId: ArchetypeIdentifier;
  private name: string;
  private description: string;
  private ability: Action;
  private critRate: number; // Monsters have a default crit rate of 10%

  constructor(
    name: string,
    ability: Action,
    archetypeId: ArchetypeIdentifier,
    description: string,
    critRate: number = 10
  ) {
    this.ability = ability;
    this.name = name;
    this.critRate = critRate;
    this.description = description;
    this.archetypeId = archetypeId;
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

  public getArchetypeIdentifier(): ArchetypeIdentifier {
    return this.archetypeId;
  }

  public getArchetypeInfo(): ArchetypeInfo {
    return {
      id: this.archetypeId,
      name: this.name,
      description: this.description,
      ability: this.ability.getActionState(),
    };
  }
}
