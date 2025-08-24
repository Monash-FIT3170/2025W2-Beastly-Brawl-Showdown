import { Monster } from "./monster/monster";
import { Action } from "./action/action";
import { PlayerState } from "/types/single/playerState";
import { Status } from "./status/status";
import { Item } from "./item/item";

export class Player {
  private id: string;
  private name: string;
  private monster: Monster | null;
  public currentGameCode: number;
  private currentlyDodging = false;
  private currentHealth: number;
  private currentAttackStat: number;
  private currentArmourClassStat: number;
  private botPlayer: boolean;

  private actions: Action[] = [];
  private statuses: Status[] = [];

  private logs: string[] = [];
  private battleLogs: string[] = [];
  private successfulHit: number = 0;
  private successfulBlock: number = 0;
  private inventory: Item[] = [];
  constructor(id: string, name: string, botPlayer?: boolean) {
    this.name = name;
    this.id = id;
    this.monster = null;
    this.currentHealth = 0;
    this.currentAttackStat = 0;
    this.currentArmourClassStat = 0;
    this.currentGameCode = 0;
    this.botPlayer = botPlayer ?? false;
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

  public addStatus(status: Status, succesRate: number): {success: boolean; reason?: string; metadata?: unknown}{
    const chance = Math.random() * 100;
    if (chance >= succesRate){
      return {success: false, reason: "Missed"}
    }
    this.statuses.push(status);
    return {success: true}
  }

  public tickStatuses() {
    this.statuses.forEach((status) => status.tick(this));
    //removes statuses that have expired after the tick
    this.statuses = this.statuses.filter((status) => !status.isExpired());
  }

  public hasStatus(name: String) {
    return this.statuses.some((status) => status.getName() === name);
  }

  public removeStatus(statusToRemove: Status){
    this.statuses = this.statuses.filter((status) => status !== statusToRemove);
  }

  public getSuccessfulBlock() {
    return this.successfulBlock;
  }

  public isBotPlayer(): boolean{
    return this.botPlayer;
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

  //Similar to resetStats, but also restore player HP to full
  public prepareForNextBattle(): void {
    if (this.monster){
      this.currentHealth = this.monster.getMaxHealth()
      this.currentAttackStat = this.monster.getAttackBonus();
      this.currentArmourClassStat = this.monster.getArmourClass();
      this.statuses = [];
    }
  }



  public clearBattleLogs(): void {
    this.battleLogs = [];
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

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  //HEALTH METHODS:
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

  //STAT METHODS:

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

  public resetStats(): void {
    if (this.monster) {
      this.currentAttackStat = this.monster.getAttackBonus();
      this.currentArmourClassStat = this.monster.getArmourClass();
      this.dodging = false;
    }
  }

  public changeStat(stat: string, change: number): void {
    switch (stat) {
      case "health":
        this.incHealth(change);
        break;
      case "attack":
        this.incAttackStat(change);
        break;
      case "armour":
        this.incArmourClassStat(change);
        break;
      default:
        console.error(`Unknown stat: ${stat}`);
    }
  }


  //ACTION METHODS:
  public getActions(): Action[] {
    return this.actions;
  }

  public addAction(action: Action): void {
    if (this.actions.length > 0) {
      this.resetActions();
    }
    this.actions.push(action);
  }

  public removeAction(action: Action): void {
    this.actions = this.actions.filter((a) => a.getName() !== action.getName());
  }

  public resetActions(): void {
    this.actions = [];
  }

  //INVENTORY METHODS:
  public getInventory(): Item[] {
    return this.inventory;
  }

  public checkInventory(item: Item): boolean {
    //checks inventory for item
    return this.inventory.some((i) => i.getName() === item.getName());
  }

  public addToInventory(item: Item): void {
    this.inventory.push(item);
  }

  public removeFromInventory(item: Item): void {
    //done like this incase you have multiple of the same item
    //TODO: might be done incorrectly needs to be tested.
    const i = this.inventory.indexOf(item);
    if (i !== -1) {
      this.inventory.splice(i, 1);
    }
  }

  public clearInventory(): void {
    this.inventory = [];
  }

  //PLAYER STATE:
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

      statuses: this.statuses,

      monster: this.monster ? this.monster.getMonsterState() : null,

      logs: this.logs,
      battleLogs: this.battleLogs,
    };
  }
}
