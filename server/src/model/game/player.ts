import { Monster } from "./monster/monster";
import { Action } from "./action/action";
import { PlayerState } from "/types/single/playerState";
import { Status } from "./status/status";
import { Consumable } from "./consumables/consumable";
import { Equipment } from "./equipment/equipment";

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
  private botPlayer: boolean;

  private actions: Action[] = [];
  private statuses: Status[] = [];

  private logs: string[] = [];
  private battleLogs: string[] = [];
  private successfulHit: number = 0;
  private successfulBlock: number = 0;

  private consumables: Consumable[] = [];
  private equipment: Equipment[] = [];

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
      this.dodging = false; //TODO: fix
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

  //STATUS METHODS:
  public getStatuses(): Status[] {
    return this.statuses;
  }

  public addStatus(status: Status) {
    this.statuses.push(status);
  }

  public tickStatuses() {
    console.log("TICKING STATUSES...");
    console.log(this.name);
    console.log("pre-tick statuses:", this.statuses);
    console.log(
      "names",
      this.statuses.forEach((status) => status.getName())
    );
    this.statuses.forEach((status) => status.tick(this));
    //removes statuses that have expired after the tick
    this.statuses = this.statuses.filter((status) => !status.isExpired());
  }

  public hasStatus(name: String) {
    return this.statuses.some((status) => status.getName() === name);
  }

  public removeStatus(statusToRemove: Status) {
    this.statuses = this.statuses.filter((status) => status !== statusToRemove);
  }

  //HIT/BLOCK METHODS:
  public getSuccessfulHit() {
    return this.successfulHit;
  }

  public dodge(): void {
    //sets the player in a dodging position
    this.currentlyDodging = true;
  }

  public getDodgingPosition(): boolean {
    //returns wheather or not the player was dodging
    return this.currentlyDodging;
  }

  public getSuccessfulBlock() {
    return this.successfulBlock;
  }

  public isBotPlayer(): boolean {
    return this.botPlayer;
  }

  public incSuccessfulHit(number: number): void {
    this.successfulHit += number;
  }

  public incSuccessfulBlock(number: number): void {
    this.successfulBlock += number;
  }

  //GAMECODE METHODS:
  public getGameCode() {
    return this.currentGameCode;
  }

  public updateGameCode(newCode: number) {
    this.currentGameCode = newCode;
  }

  //LOG METHODS:
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

  public clearBattleLogs(): void {
    this.battleLogs = [];
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
  public getConsumables(): Consumable[] {
    return this.consumables;
  }

  public hasConsumable(consumable: Consumable): boolean {
    //checks inventory for item
    return this.consumables.some((c) => c.getName() === consumable.getName());
  }

  public giveConsumable(item: Consumable): void {
    this.consumables.push(item);
  }

  public removeConsumable(item: Consumable): void {
    //done like this incase you have multiple of the same item
    //TODO: might be done incorrectly needs to be tested.
    const i = this.consumables.indexOf(item);
    if (i !== -1) {
      this.consumables.splice(i, 1);
    }
  }

  public clearConsumables(): void {
    this.consumables = [];
  }

  public getEquipment(): Equipment[] {
    return this.equipment;
  }

  public hasEquipment(equipment: Equipment): boolean {
    return this.equipment.some((e) => e.getName() == equipment.getName());
  }

  public giveEquipment(equip: Equipment): boolean {
    if (this.equipment.length >= 3) {
      return false; // means that equipment is full
    }

    this.equipment.push(equip);
    equip.equip(this);
    this.resetStats();
    return true;
  }

  public isEquipmentFull(): boolean {
    return this.equipment.length >= 3;
  }

  public removeEquipment(equip: Equipment): void {
    //done like this incase you have multiple of the same item
    //TODO: might be done incorrectly needs to be tested.
    const i = this.equipment.indexOf(equip);
    if (i !== -1) {
      this.equipment.splice(i, 1);
    }
    equip.unequip(this);
    this.resetStats();
  }

  public clearEquipment(): void {
    this.equipment = [];
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
