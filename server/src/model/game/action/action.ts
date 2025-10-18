import { Player } from "../player";
import {
  ActionIdentifier,
  ActionResult,
  ActionState,
} from "/types/single/actionState";
import { BattleEffect } from "../status/battleEffect";

export abstract class Action {
  private id: ActionIdentifier;
  private name: string;
  private description: string;

  private currentUse: number;
  private maxUse: number;
  private dodgeable: boolean;

  protected damage: number = 0;

  constructor(
    id: ActionIdentifier,
    name: string,
    description: string,
    maxUse: number,
    dodgeable: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currentUse = maxUse;
    this.maxUse = maxUse;
    this.dodgeable = dodgeable;
  }

  public incCurrentUse(value: number): void {
    this.currentUse += value;
  }

  public getCurrentUse(): number {
    return this.currentUse;
  }
  //returns if an action can be dodged
  public getDodgeable(): boolean {
    return this.dodgeable;
  }
  //if an action cant be dodged, this function is used to set it apart from the default
  protected setDodgeable(value: boolean): void {
    this.dodgeable = value;
  }
  public getMaxUse(): number {
    return this.maxUse;
  }

  public getDamage(): number {
    return this.damage;
  }

  public abstract prepare(actingPlayer: Player, affectedPlayer: Player): void;

  //Return the "effects" caused by action
  public abstract execute(
    actingPlayer: Player,
    affectedPlayer: Player
  ): ActionResult;

  public abstract prepareAnimation(): string | [string, number]; // returns the socket message that represents the animation name

  public getId(): ActionIdentifier {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getActionState(): ActionState {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      currentUse: this.currentUse,
      maxUse: this.maxUse,
    };
  }

  protected executeBattleEffect(
    actingPlayer: Player,
    affectedPlayer: Player,
    success: boolean
  ): void {
    const actingStatuses = actingPlayer
      .getStatuses()
      .filter((s) => s instanceof BattleEffect);
    const affectedStatuses = affectedPlayer
      .getStatuses()
      .filter((s) => s instanceof BattleEffect);

    actingStatuses.forEach((s) =>
      s.actingPlayerEffect(actingPlayer, affectedPlayer, this, success)
    );
    affectedStatuses.forEach((s) =>
      s.affectedPlayerEffect(actingPlayer, affectedPlayer, this, success)
    );
  }
}
