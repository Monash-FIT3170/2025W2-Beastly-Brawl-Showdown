import { Archetype } from "../archetype/archetype";
import { iAbility } from "../action/ability/iAbility";
import { Action } from "../action/action";

export abstract class Monster {
  private name: string;

  private description: string;

  private archetype: Archetype;

  private abilities: iAbility[] = [];

  private maxHealth: number;

  private attackAction: Action;
  private defenseAction: Action;

  constructor(
    name: string,
    description: string,
    archetype: Archetype,
    ability: iAbility,
    maxHealth: number,
    attackAction: Action,
    defenseAction: Action
  ) {
    this.name = name;
    this.description = description;
    this.archetype = archetype;
    this.abilities.push(archetype.getAbility());
    this.abilities.push(ability);
    this.maxHealth = maxHealth;
    this.attackAction = attackAction;
    this.defenseAction = defenseAction;
  }

  public getName(): string {
    return this.name;
  }

  public getArchetype(): Archetype {
    return this.archetype;
  }

  public getAbilities(): iAbility[] {
    return this.abilities;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public getAttackAction(): Action {
    return this.attackAction;
  }

  public getDefenseAction(): Action {
    return this.defenseAction;
  }
}
