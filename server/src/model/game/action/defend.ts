import { Action } from "./action";
import { Player } from "../player";

export class DefendAction extends Action {
  private defensePower: number;

  constructor(defensePower: number = 10) {
    super("Defend", "Defend against an attack");
    this.defensePower = defensePower;
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
