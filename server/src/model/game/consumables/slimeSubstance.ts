import { Player } from "../player";
import { SlimeBoost } from "../status/slimeBoost";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";

export class SlimeSubstance extends Consumable {
  constructor() {
    const description =
      "This slimy substance seems to hold the powers of a fallen slime.. Consuming this ooze will boost your lowest rated stats overtime.";
    super("Slime Substance", description, ConsumableType.SELF_INFLICT);
  }

  public getStatDescription(): string {
    return "Get Slime Boost status for 3 turns.";
  }
  public consume(player: Player): void {
    //TODO: decide appropriate time for status
    player.addStatus(new SlimeBoost(3));
    player.addLog(
      `You consumed the slimy substance, it seems to have gifted you the natural Slime Boost`
    );
  }
  protected getImageString(): string {
    return "SLIME_SUBSTANCE";
  }
}
