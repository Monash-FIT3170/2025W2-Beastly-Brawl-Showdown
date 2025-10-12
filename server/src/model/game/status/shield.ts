import { Status } from "./status";
import { Player } from "../player";
import { StatusType } from "/types/single/statusType";

export class Shield extends Status {
  private shieldStrength: number;

  constructor(duration: number = 3, shieldStrength: number = 5) {
    super(
      "Shield",
      "Protected by a defensive barrier",
      duration,
      StatusType.BUFF
    );
    this.shieldStrength = shieldStrength;
  }

  public getShieldStrength(): number {
    return this.shieldStrength;
  }

  public breakShield(): void {
    this.countDown = 0;
  }

  public setCountDown(turns: number): void {
    this.countDown = turns;
  }

  public updateLogs(player: Player): void {
    // player.addLog(
    //   `Your shield continues to protect you (${this.countDown} turns remaining).`
    // );
  }

  public expire(player: Player): void {
    player.addLog("Your defensive shield has faded away.");
  }

  public getState() {
    return {
      name: this.name,
      description: this.description,
      countDown: this.countDown,
      type: this.type,
      shieldStrength: this.shieldStrength,
    };
  }
}
