import { Archetype } from "../archetype/archetype";
import { Action } from "../action/action";
import { AttackAction } from "../action/attack";
import { DefendAction } from "../action/defend";
import { MonsterIdentifier, MonsterState } from "/types/single/monsterState";
import { ActionIdentifier, ActionState } from "/types/single/actionState";

export abstract class Monster {
  private id: MonsterIdentifier;
  private name: string;

  private description: string;

  private archetype: Archetype;

  private possibleActions: Action[] = [];

  private maxHealth: number;
  private attackBonus: number;
  private armourClass: number;
  private critRate: number;

  private useTemporaryActions: boolean = false;
  private temporaryActions: Action[] = [];

  constructor(
    id: MonsterIdentifier,
    name: string,
    description: string,
    archetype: Archetype,
    ability: Action,
    maxHealth: number,
    attackBonus: number,
    armourClass: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.archetype = archetype;
    this.maxHealth = maxHealth;
    this.attackBonus = attackBonus;
    this.armourClass = armourClass;
    this.critRate = archetype.getCritRate();

    this.possibleActions.push(new AttackAction(attackBonus, this.critRate));
    this.possibleActions.push(new DefendAction(armourClass));
    this.possibleActions.push(ability);
    this.possibleActions.push(archetype.getAbility());
  }

  public getAction(actionIdentifier: ActionIdentifier): Action | undefined {
    return this.possibleActions.find(
      (action) => action.getId() === actionIdentifier
    );
  }

  public getId(): MonsterIdentifier {
    return this.id;
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

  public getPossibleActionStates(): ActionState[] {
    //checks if using temporary actions
    if (this.useTemporaryActions == true) {
      return this.temporaryActions.map((action) => action.getActionState());
    }
    return this.possibleActions.map((action) => action.getActionState());
  }

  //sets alternate actions for the next turn
  public setTemporaryActions(actions: Action[]) {
    this.useTemporaryActions = true;
    this.temporaryActions = actions;
  }

  public removeTemporaryActions() {
    this.useTemporaryActions = false;
    this.temporaryActions = [];
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

  public getMonsterState(): MonsterState {
    return {
      id: this.id,
      name: this.name,
      description: this.description,

      maxHealth: this.maxHealth,
      attackBonus: this.attackBonus,
      armourClass: this.armourClass,

      possibleActions: this.getPossibleActionStates(),
    };
  }
}
