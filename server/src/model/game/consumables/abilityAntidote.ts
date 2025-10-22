import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";

export class AbilityAntidote extends Consumable {
  constructor() {
    //btw feel free to change descriptions this is just for now
    const description =
      "An orange liquid stored in a small vial, it is said to replenish lost abilities.";
    super("Ability Antidote", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): [string, string] {
    // Replenish all abilities (actions) to max uses
    player
      .getMonster()!
      .getPossibleActions()
      .forEach((action) => {
        action.incCurrentUse(action.getMaxUse() - action.getCurrentUse());
      });

    let actingLog = `You used Ability Antidote! All abilities replenished.`;
    let affectedLog = `${player.getName()} used Ability Antidote! Replenishing all their abilities.`;
    return [actingLog, affectedLog];
  }

  public getStatDescription(): string {
    return "Replenishes all ability uses to maximum.";
  }

  protected getImageString(): string {
    return "ABILITY_ANTIDOTE";
  }
}
