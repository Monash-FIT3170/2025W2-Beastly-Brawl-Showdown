import { Monster } from "./monster/monster";
import { Action } from "./action/action";
import { PlayerState } from "/types/single/playerState";

export class Player {
  private id: string;
  private name: string;
  private monster: Monster;

  private currentHealth: number;
  private currentAttackStat: number;
  private currentArmourClassStat: number;

  private actions: Action[] = [];

  private logs: string[] = [];
  private successfulHit: number = 0;
  private successfulBlock: number = 0;

  constructor(id: string, name: string, monster: Monster) {
    this.name = name;
    this.id = id;
    this.monster = monster;
    this.currentHealth = monster.getMaxHealth();
    this.currentAttackStat = monster.getAttackBonus();
    this.currentArmourClassStat = monster.getArmourClass();
  }
  public getSuccessfulHit(){
    return this.successfulHit
  }

  public getSuccessfulBlock(){
    return this.successfulBlock
  }

  public incSuccessfulHit(number: number): void{
    this.successfulHit += number
  }

  public incSuccessfulBlock(number: number): void{
    this.successfulBlock += number
  }

  public getLogs(): string[] {
    return this.logs;
  }

  public addLog(log: string): void {
    this.logs.push(log);
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public resetStats(): void {
    this.currentAttackStat = this.monster.getAttackBonus();
    this.currentArmourClassStat = this.monster.getArmourClass();
  }

  public resetActions(): void {
    this.actions = [];
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

  // TODO: Remove the other action and push the new one? How do we want to handle this?
  public addAction(action: Action): void {
    this.actions.push(action);
  }

  public removeAction(action: Action): void {
    this.actions = this.actions.filter((a) => a.getName() !== action.getName());
  }

  public clearActions(): void {
    this.actions = [];
  }

  public getPlayerState(): PlayerState {
    return {
      id: this.id,
      name: this.name,
      monsterName: this.monster.getName(),

      currentHealth: this.currentHealth,
      currentAttackStat: this.currentAttackStat,
      currentArmourClassStat: this.currentArmourClassStat,
      initialHealth: this.monster.getMaxHealth(),
      successBlock: this.successfulBlock,
      successHit: this.successfulHit,

      logs: this.logs,
    };
  }
}
