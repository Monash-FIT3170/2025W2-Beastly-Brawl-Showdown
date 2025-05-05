import { Action } from "./action";
import { Player } from "../player";

export class DefendAction extends Action {
  private armourBonus: number;

  constructor(armourBonus: number) {
    super("Defend", "Defend against an attack");
    this.armourBonus = armourBonus;
  }

  public prepare(actingPlayer: Player, affectedPlayer: Player): void {
    actingPlayer.incArmourClassStat(this.armourBonus);
  }

  public execute(actingPlayer: Player, affectedPlayer: Player): void {}
}
