import { Player } from "../player";
import { StatusType } from "/types/single/statusType";

export abstract class Status {
  public name: string;
  protected description: string;
  protected countDown: number;
  public type: StatusType;

  constructor(name: string, description: string, countDown: number = 0, type: StatusType) {
    this.name = name;
    this.description = description;
    this.countDown = countDown;
    this.type = type;
  }

  public tick(player: Player): void {
    if (this.countDown > 0) {
      //necessary check as UI requires status to remain post countdown = 0
      this.effect(player);
    }
    this.countDown -= 1;
  }

  public abstract effect(player: Player): void;

  public getName(): string {
    return this.name;
  }

  public getType(): StatusType{
    return this.type
  }

  public isExpired(): boolean {
    //checks if countdown hit 0
    if (this.countDown < 0) {
      return true;
    }

    return false;
  }
}
