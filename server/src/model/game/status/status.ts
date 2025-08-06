import { Player } from "../player";

export abstract class Status {
  protected name: string;
  protected description: string;
  protected countDown: number;
 

  constructor(name: string, description: string, countDown: number=0) {
    this.name = name;
    this.description = description;
    this.countDown = countDown;
  }

  public tick(player: Player): void {
    this.effect(player);
    this.countDown -= 1;
  } 

  public abstract effect(player: Player): void;

  public getName(): string{
    return this.name;
  }

  public isExpired(): boolean {
    //checks if countdown hit 0
    if(this.countDown <= 0){
      return true;
    }

    return false;
  }
    
}
