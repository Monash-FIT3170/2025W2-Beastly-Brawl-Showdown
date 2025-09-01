import { Player } from "../player";
import { SlimeBoost } from "../status/slimeBoost";
import { Consumable } from "./consumable";

export class SlimeSubstance extends Consumable {
  constructor() {
    const description =
      "This slimy substance seems to hold the powers of a fallen slime.. Consuming this ooze will boost your lowest rated stat for a temporary period.";
    super("Slime Substance", description);
  }

  public getStatDescription(): string {
    return "Get Slime Boost status for 3 turns.";
  }
  public consume(player: Player): void {
    //TODO: decide appropriate time for status
    player.addStatus(new SlimeBoost(3));
  }
  protected getImageString(): string {
    return "item";
  }
}
