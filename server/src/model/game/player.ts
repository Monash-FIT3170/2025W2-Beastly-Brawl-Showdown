import { UUID } from "crypto";
import { Monster } from "./monster/monster";
import { Action } from "./action/action";

export class Player {
  private id: string;
  private name: string;
  private monster: Monster;

  private currentHealth: number;
  private currentAttackStat: number;
  private currentArmourClassStat: number;

  private actions: Action[] = [];

  constructor(id: string, name: string, monster: Monster) {
    this.name = name;
    this.id = id;
    this.monster = monster;
    this.currentHealth = monster.getMaxHealth();
    this.currentAttackStat = monster.getAttackBonus();
    this.currentArmourClassStat = monster.getArmourClass();
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public getMonster(): Monster {
    return this.monster;
  }

  public getHealth(): number {
    return this.currentHealth;
  }

  public setHealth(health: number): void {
    this.currentHealth = health;
  }

  public incHealth(number: number): void {
    this.currentHealth += number;
    if (this.currentHealth < 0) {
      this.currentHealth = 0;
    } else if (this.currentHealth > this.monster.getMaxHealth()) {
      this.currentHealth = this.monster.getMaxHealth();
    }
  }

  public getAttackStat(): number {
    return this.currentAttackStat;
  }

  public setAttackStat(attackStat: number): void {
    this.currentAttackStat = attackStat;
  }

  public incAttackStat(number: number): void {
    this.currentAttackStat += number;
  }

  public getArmourClassStat(): number {
    return this.currentArmourClassStat;
  }

  public setArmourClassStat(armourClassStat: number): void {
    this.currentArmourClassStat = armourClassStat;
  }

  public incArmourClassStat(number: number): void {
    this.currentArmourClassStat += number;
  }

  public getActions(): Action[] {
    return this.actions;
  }

  public addAction(action: Action): void {
    this.actions.push(action);
  }

  public removeAction(action: Action): void {
    this.actions = this.actions.filter((a) => a.getName() !== action.getName());
  }
  public clearActions(): void {
    this.actions = [];
  }
}
