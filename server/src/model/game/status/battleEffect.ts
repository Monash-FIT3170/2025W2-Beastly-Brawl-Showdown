import { Action } from "../action/action";
import { Player } from "../player";
import { Status } from "./status";

export abstract class BattleEffect extends Status {
  //does different stuff depending on which player had the effect.
  public abstract affectedPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void;

  public abstract actingPlayerEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    action: Action,
    success: boolean
  ): void;
}
