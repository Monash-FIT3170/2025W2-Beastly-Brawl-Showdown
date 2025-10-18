import { Player } from "../player";
import { StatusType } from "/types/single/statusType";

export abstract class Status {
  public name: string;
  protected description: string;
  protected countDown: number;
  public type: StatusType;

  constructor(
    name: string,
    description: string,
    countDown: number = 0,
    type: StatusType
  ) {
    this.name = name;
    this.description = description;
    this.countDown = countDown;
    this.type = type; 
  }

  public tick(player: Player): void {
    if (this.countDown > 0) {
      // this.effect(player);
      this.updateLogs(player);
    }
    this.countDown -= 1;
  }

  // public abstract effect(player: Player): void;

  public abstract updateLogs(player: Player): void;

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getRemainingTurn(): number {
    return this.countDown;
  }

  public getType(): StatusType {
    return this.type;
  }

  public isExpired(player: Player): boolean {
    //checks if countdown hit 0
    //gets called after tick()
    if (this.countDown == 0) {
      this.expire(player);
      return true;
    }
    return false;
  }

  public endOfBattle(player: Player | undefined): void {}

  // useful for removing statuses that might give temporary buffs or giving nerfs post buff
  public abstract expire(player: Player): void;
}
