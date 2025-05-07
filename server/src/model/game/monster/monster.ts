import { Archetype } from "../archetype/archetype";
import { Action } from "../action/action";
import { AttackAction } from "../action/attack";
import { DefendAction } from "../action/defend";

export abstract class Monster {
  private name: string;

  private description: string;

  private archetype: Archetype;

  private possibleActions: Action[] = [];

  private maxHealth: number;
  private attackBonus: number;
  private armourClass: number;

  constructor(
    name: string,
    description: string,
    archetype: Archetype,
    ability: Action,
    maxHealth: number,
    attackBonus: number,
    armourClass: number
  ) {
    this.name = name;
    this.description = description;
    this.archetype = archetype;
    this.maxHealth = maxHealth;
    this.attackBonus = attackBonus;
    this.armourClass = armourClass;
    this.possibleActions.push(new AttackAction(attackBonus));
    this.possibleActions.push(new DefendAction(armourClass));
    this.possibleActions.push(ability);
    this.possibleActions.push(archetype.getAbility());
  }

  public getAction(actionName: string): Action | undefined {
    return this.possibleActions.find(
      (action) => action.getName() === actionName
    );
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getArchetype(): Archetype {
    return this.archetype;
  }

  public getPossibleActions(): Action[] {
    return this.possibleActions;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public getAttackBonus(): number {
    return this.attackBonus;
  }

  public getArmourClass(): number {
    return this.armourClass;
  }
}
