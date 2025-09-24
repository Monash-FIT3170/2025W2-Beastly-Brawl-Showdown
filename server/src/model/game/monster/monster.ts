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

  private startingHealth: number;
  private startingAttackBonus: number;
  private startingArmourClass: number;

  private useTemporaryActions: boolean = false;
  private temporaryActions: Action[] = [];
  private attackAction: AttackAction;

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
    this.startingHealth = maxHealth;
    this.startingAttackBonus = attackBonus;
    this.startingArmourClass = armourClass;
    this.critRate = archetype.getCritRate();

    this.attackAction = new AttackAction(attackBonus, this.critRate);
    this.possibleActions.push(this.attackAction);
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
    if (this.useTemporaryActions == true) {
      return this.temporaryActions;
    }
    return this.possibleActions;
  }

  public getAttackAction(): AttackAction {
    return this.attackAction;
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

  public incMaxHealth(health: number): void {
    this.maxHealth += health;
  }

  public incAttackBonus(attack: number): void {
    this.attackBonus += attack;
  }

  public incArmourClass(armour: number): void {
    this.armourClass += armour;
  }

  public pveScaling(stage: number): void {
    console.log("PVE SCALING DEBUG: HEALTH", this.maxHealth);
    console.log("PVE SCALING DEBUG: ATK BONUS", this.attackBonus);

    if (stage === 4) {
      //mini boss
      this.maxHealth = this.startingHealth = Math.ceil(this.maxHealth * 0.9);
      this.attackBonus = this.startingAttackBonus = Math.ceil(
        this.attackBonus * 0.9
      );
    } else if (stage === 8) {
      //main boss
      this.maxHealth = this.startingHealth = Math.ceil(this.maxHealth * 1.5);
      this.attackBonus = this.startingAttackBonus = Math.ceil(
        this.attackBonus * 1.5
      );
    } else {
      //every other stage
      this.maxHealth = this.startingHealth = Math.ceil(stage * 3.5);
      this.attackBonus = this.startingAttackBonus = Math.ceil(
        this.attackBonus + stage * 0.75
      );
    }
    console.log("PVE SCALING DEBUG: HEALTH SCALED", this.maxHealth);
    console.log("PVE SCALING DEBUG: ATK BONUS SCALED", this.attackBonus);
  }

  public getMonsterState(): MonsterState {
    return {
      id: this.id,
      archetypeId: this.archetype.getArchetypeIdentifier(),
      name: this.name,
      description: this.description,

      maxHealth: this.maxHealth,
      attackBonus: this.attackBonus,
      armourClass: this.armourClass,

      startingHP: this.startingHealth,
      startingATK: this.startingAttackBonus,
      startingAC: this.startingArmourClass,

      possibleActions: this.getPossibleActionStates(),
    };
  }
}
