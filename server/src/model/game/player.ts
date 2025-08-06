import { Monster } from "./monster/monster";
import { Action } from "./action/action";
import { PlayerState } from "/types/single/playerState";
import { Status } from "./status/status";

export class Player {
  private id: string;
  private name: string;
  private monster: Monster | null;
  public currentGameCode: number;
  private score: number = 0;
  private currentlyDodging = false;
  private currentHealth: number;
  private currentAttackStat: number;
  private currentArmourClassStat: number;

  private actions: Action[] = [];
  private statuses: Status[] = [];

  private logs: string[] = [];
  private battleLogs: string[] = [];
  private successfulHit: number = 0;
  private successfulBlock: number = 0;

  constructor(id: string, name: string) {
    this.name = name;
    this.id = id;
    this.monster = null;
    this.currentHealth = 0;
    this.currentAttackStat = 0;
    this.currentArmourClassStat = 0;
    this.currentGameCode = 0;
  }

  public getSuccessfulHit() {
    return this.successfulHit;
  }
  //sets the player in a dodging position
  public dodge(): void {
    this.currentlyDodging = true;
  }
  //returns wheather or not the player was dodging
  public getDodgingPosition(): boolean {
    return this.currentlyDodging;
  }

  public getStatuses(): Status[] {
    return this.statuses;
  }

  public addStatus(status: Status){
    this.statuses.push(status);
  }

  public tickStatuses() {
    this.statuses.forEach((status) => status.tick(this));
    //removes statuses that have expired after the tick
    this.statuses = this.statuses.filter((status) => !status.isExpired());
  }

  //is this function required?
  public hasStatus(name: String) {
    return this.statuses.some((status) => status.getName() === name);
  }

  public removeStatus(statusToRemove: Status){
    this.statuses = this.statuses.filter(status => status !== statusToRemove);
  }

  public getSuccessfulBlock() {
    return this.successfulBlock;
  }

  public incSuccessfulHit(number: number): void {
    this.successfulHit += number;
  }

  public incSuccessfulBlock(number: number): void {
    this.successfulBlock += number;
  }

  public getGameCode() {
    return this.currentGameCode;
  }

  public updateGameCode(newCode: number) {
    this.currentGameCode = newCode;
  }

  public getLogs(): string[] {
    return this.logs;
  }

  public addLog(log: string): void {
    this.logs.push(log);
  }

  public addBattleLog(log: string): void {
    // match summary logs
    this.battleLogs.push(log);
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public resetStats(): void {
    if (this.monster) {
      this.currentAttackStat = this.monster.getAttackBonus();
      this.currentArmourClassStat = this.monster.getArmourClass();
      this.dodging = false;
    }
  }

  public resetActions(): void {
    this.actions = [];
  }

  public getName(): string {
    return this.name;
  }

  public clearBattleLogs(): void {
    this.battleLogs = [];
  }

  public getId(): string {
    return this.id;
  }

  public getMonster(): Monster | null {
    return this.monster;
  }

  public setMonster(monster: Monster) {
    this.monster = monster;
    this.currentHealth = monster.getMaxHealth();
    this.currentAttackStat = monster.getAttackBonus();
    this.currentArmourClassStat = monster.getArmourClass();
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
    } else if (
      this.monster &&
      this.currentHealth > this.monster.getMaxHealth()
    ) {
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
    if (this.actions.length > 0) {
      this.clearActions();
    }
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
      // monsterName: this.monster.getName(),

      currentHealth: this.currentHealth,
      currentAttackStat: this.currentAttackStat,
      currentArmourClassStat: this.currentArmourClassStat,
      // initialHealth: this.monster.getMaxHealth(),
      successBlock: this.successfulBlock,
      successHit: this.successfulHit,

      monster: this.monster ? this.monster.getMonsterState() : null,

      logs: this.logs,
      battleLogs: this.battleLogs,
    };
  }
}
