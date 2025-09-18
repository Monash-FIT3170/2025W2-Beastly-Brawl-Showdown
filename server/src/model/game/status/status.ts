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
      //necessary check as UI requires status to remain post countdown = 0
      //OR NOT? - cos i swear i added this cos stun status was disappearing immediately - but perhaps adventure is built different, need to test on multiplayer cos if they're built differently we are FUCKED!!!!
      //we are maybe calling tick statuses at different times.
      //need to find where
      this.effect(player);
    }
    this.countDown -= 1;
  }

  public abstract effect(player: Player): void;

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

  public isExpired(): boolean {
    //checks if countdown hit 0
    if (this.countDown == 0) {
      return true;
    }

    return false;
  }
}
